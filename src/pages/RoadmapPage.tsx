import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, BookOpen, Calendar, Clock, Code, FileText, Loader2, Lightbulb, Plus, Trash2, Link } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { FlashcardDeck } from '@/components/learning/FlashcardDeck';
import { generateFlashcards } from '@/utils/flashcardGenerator';
import { generateFlashcardsFromResources } from '@/utils/resourceFlashcards';
import { useGameProgress } from '@/contexts/GameProgressContext';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// Interface for roadmap objects
interface Roadmap {
  id: number;
  title: string;
  description: string;
  milestones: any[]; // Could be more specific if needed
  totalHours: number;
  progress: number;
  lastAccessed?: string;
  isSaved?: boolean;
}

// Interface for a resource
interface Resource {
  title: string;
  type: string;
  url: string;
}

// Interface for a milestone
interface Milestone {
  id: number;
  title: string;
  description: string;
  resources: Resource[];
  timeEstimate: string;
  isCompleted: boolean;
}

const RoadmapPage = () => {
  const [query, setQuery] = useState('');
  const [generating, setGenerating] = useState(false);
  const [currentTab, setCurrentTab] = useState('roadmaps');
  const [generatedRoadmap, setGeneratedRoadmap] = useState<null | {
    title: string;
    description: string;
    milestones: Array<{
      id: number;
      title: string;
      description: string;
      resources: Array<{ title: string; type: string; url: string }>;
      timeEstimate: string;
    }>;
  }>(null);
  
  const [selectedFlashcards, setSelectedFlashcards] = useState<{ topic: string, cards: any[] } | null>(null);
  const [savedRoadmaps, setSavedRoadmaps] = useState<Roadmap[]>([]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [roadmapToDelete, setRoadmapToDelete] = useState<number | null>(null);
  const [activeMilestoneId, setActiveMilestoneId] = useState<number | null>(null);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  
  const { gameProgress, addXp } = useGameProgress();
  const { toast } = useToast();
  
  // Sample roadmaps - now used as starter content
  const sampleRoadmaps = [
    {
      id: 1,
      title: "Frontend Developer Path",
      description: "Master modern frontend development with React, TypeScript, and more",
      milestones: [
        {
          id: 1,
          title: "HTML & CSS Fundamentals",
          description: "Learn the building blocks of the web",
          resources: [
            { title: "HTML Basics", type: "article", url: "#" },
            { title: "CSS Crash Course", type: "video", url: "#" }
          ],
          timeEstimate: "2 weeks",
          isCompleted: false
        },
        {
          id: 2,
          title: "JavaScript Essentials",
          description: "Master the core language of web interactivity",
          resources: [
            { title: "JavaScript Fundamentals", type: "documentation", url: "#" },
            { title: "Building Interactive Websites", type: "video", url: "#" }
          ],
          timeEstimate: "3 weeks",
          isCompleted: false
        }
      ],
      totalHours: 120,
      progress: 25,
      lastAccessed: "2 days ago",
      isSaved: true
    },
    {
      id: 2,
      title: "Full Stack Engineer",
      description: "Comprehensive path to becoming a full stack developer",
      milestones: [
        {
          id: 1,
          title: "Frontend Fundamentals",
          description: "Learn the client-side technologies",
          resources: [
            { title: "React Basics", type: "article", url: "#" },
            { title: "Building UIs", type: "video", url: "#" }
          ],
          timeEstimate: "3 weeks",
          isCompleted: true
        },
        {
          id: 2,
          title: "Backend Development",
          description: "Master server-side programming",
          resources: [
            { title: "Node.js Essentials", type: "documentation", url: "#" },
            { title: "RESTful API Design", type: "video", url: "#" }
          ],
          timeEstimate: "4 weeks",
          isCompleted: false
        }
      ],
      totalHours: 200,
      progress: 10,
      lastAccessed: "5 days ago",
      isSaved: true
    },
    {
      id: 3,
      title: "UI/UX Designer",
      description: "Learn design principles and tools for creating exceptional user experiences",
      milestones: [
        {
          id: 1,
          title: "Design Fundamentals",
          description: "Understand core design principles",
          resources: [
            { title: "Color Theory", type: "article", url: "#" },
            { title: "Typography Basics", type: "video", url: "#" }
          ],
          timeEstimate: "2 weeks",
          isCompleted: false
        },
        {
          id: 2,
          title: "User Research",
          description: "Learn how to understand user needs",
          resources: [
            { title: "User Interview Techniques", type: "documentation", url: "#" },
            { title: "Creating User Personas", type: "video", url: "#" }
          ],
          timeEstimate: "2 weeks",
          isCompleted: false
        }
      ],
      totalHours: 90,
      progress: 0,
      lastAccessed: "Never",
      isSaved: true
    }
  ];
  
  // Load saved roadmaps from localStorage
  useEffect(() => {
    const storedRoadmaps = localStorage.getItem('savedRoadmaps');
    if (storedRoadmaps) {
      setSavedRoadmaps(JSON.parse(storedRoadmaps));
    } else {
      // Initialize with sample roadmaps if nothing is saved
      setSavedRoadmaps(sampleRoadmaps);
      localStorage.setItem('savedRoadmaps', JSON.stringify(sampleRoadmaps));
    }
  }, []);
  
  // Save roadmaps to localStorage when they change
  useEffect(() => {
    if (savedRoadmaps.length > 0) {
      localStorage.setItem('savedRoadmaps', JSON.stringify(savedRoadmaps));
    }
  }, [savedRoadmaps]);
  
  const handleGenerateRoadmap = () => {
    if (!query.trim()) {
      toast({
        title: "Please enter a description",
        description: "Tell us what kind of roadmap you'd like to generate",
        variant: "destructive",
      });
      return;
    }
    
    setGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      const newRoadmap = {
        title: `${query} Roadmap`,
        description: `A customized learning path for ${query}`,
        milestones: [
          {
            id: 1,
            title: "Getting Started",
            description: "Learn the fundamentals and set up your environment",
            resources: [
              { 
                title: "Introduction to the field", 
                type: "article",
                url: "#" 
              },
              { 
                title: "Setting up your workspace", 
                type: "video",
                url: "#" 
              }
            ],
            timeEstimate: "1-2 weeks",
            isCompleted: false
          },
          {
            id: 2,
            title: "Core Concepts",
            description: "Master the essential theories and practices",
            resources: [
              { 
                title: "Core principles deep dive", 
                type: "documentation",
                url: "#" 
              },
              { 
                title: "Practical exercises", 
                type: "video",
                url: "#" 
              }
            ],
            timeEstimate: "2-3 weeks",
            isCompleted: false
          },
          {
            id: 3,
            title: "Advanced Topics",
            description: "Deepen your knowledge with specialized topics",
            resources: [
              { 
                title: "Advanced techniques", 
                type: "article",
                url: "#" 
              },
              { 
                title: "Case studies", 
                type: "documentation",
                url: "#" 
              }
            ],
            timeEstimate: "3-4 weeks",
            isCompleted: false
          }
        ]
      };
      
      setGeneratedRoadmap(newRoadmap);
      setGenerating(false);
      
      // Generate flashcards based on the query
      setSelectedFlashcards(generateFlashcards(query));
      
      toast({
        title: "Roadmap generated!",
        description: "Your personalized learning path is ready",
      });
    }, 2000);
  };

  const handleStartMilestone = (roadmapId: number, milestone: Milestone) => {
    // Update active milestone
    setActiveMilestoneId(milestone.id);
    
    // Update the lastAccessed time
    updateRoadmapLastAccessed(roadmapId);
    
    // Generate flashcards for the milestone based on its resources
    const flashcardsForMilestone = generateFlashcardsFromResources(
      milestone.title,
      milestone.resources
    );
    
    setSelectedFlashcards(flashcardsForMilestone);
    setSelectedResource(null); // Reset selected resource when starting a new milestone
    
    // Award XP for starting a new milestone
    if (!milestone.isCompleted) {
      addXp(5);
      toast({
        title: "You earned 5 XP!",
        description: "Keep learning to earn more rewards.",
      });
    }
    
    // Scroll to flashcards section
    setTimeout(() => {
      document.getElementById('flashcards-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleSelectResource = (milestone: Milestone, resource: Resource) => {
    setSelectedResource(resource);
    
    // Generate flashcards specific to this resource
    const flashcardsForResource = generateFlashcardsFromResources(
      milestone.title,
      [resource]
    );
    
    setSelectedFlashcards(flashcardsForResource);
    
    // Scroll to flashcards section
    setTimeout(() => {
      document.getElementById('flashcards-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
    
    // Award XP for engaging with a resource
    addXp(2);
  };
  
  const saveGeneratedRoadmap = () => {
    if (!generatedRoadmap) return;
    
    // Create a new roadmap object from the generated one
    const newRoadmap: Roadmap = {
      id: Date.now(), // Use timestamp as ID
      title: generatedRoadmap.title,
      description: generatedRoadmap.description,
      milestones: generatedRoadmap.milestones,
      totalHours: calculateTotalHours(generatedRoadmap.milestones),
      progress: 0,
      lastAccessed: "Just now",
      isSaved: true
    };
    
    // Add to saved roadmaps
    setSavedRoadmaps(prev => [...prev, newRoadmap]);
    
    // Switch to the roadmaps tab
    setCurrentTab('roadmaps');
    
    // Award XP for saving a roadmap
    addXp(10);
    
    toast({
      title: "Roadmap saved!",
      description: "You earned 10 XP for creating a learning path.",
    });
  };
  
  const calculateTotalHours = (milestones: any[]): number => {
    // Simple calculation based on milestone time estimates
    // In a real app, this would be more sophisticated
    return milestones.length * 40;
  };
  
  const updateRoadmapLastAccessed = (roadmapId: number) => {
    setSavedRoadmaps(prev => 
      prev.map(roadmap => 
        roadmap.id === roadmapId 
          ? { ...roadmap, lastAccessed: "Just now" } 
          : roadmap
      )
    );
  };
  
  const handleContinueRoadmap = (roadmap: Roadmap) => {
    // Find the first incomplete milestone
    const nextMilestone = roadmap.milestones.find(m => !m.isCompleted);
    
    if (nextMilestone) {
      handleStartMilestone(roadmap.id, nextMilestone);
    } else {
      // If all milestones are complete, just start the first one again
      handleStartMilestone(roadmap.id, roadmap.milestones[0]);
    }
    
    // Update the tab to view (which will display the detailed roadmap)
    setGeneratedRoadmap({
      title: roadmap.title,
      description: roadmap.description,
      milestones: roadmap.milestones
    });
    
    setCurrentTab('view');
  };
  
  const handleDeleteRoadmap = (id: number) => {
    setRoadmapToDelete(id);
    setIsDeleteDialogOpen(true);
  };
  
  const confirmDeleteRoadmap = () => {
    if (roadmapToDelete === null) return;
    
    setSavedRoadmaps(prev => prev.filter(roadmap => roadmap.id !== roadmapToDelete));
    setIsDeleteDialogOpen(false);
    setRoadmapToDelete(null);
    
    toast({
      title: "Roadmap deleted",
      description: "The roadmap has been removed from your saved paths.",
    });
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Career Roadmaps</h1>
        <p className="text-gray-600 mt-2">
          AI-powered custom roadmaps to help you achieve your career goals
        </p>
      </div>
      
      <Tabs defaultValue="roadmaps" onValueChange={setCurrentTab} value={currentTab}>
        <TabsList>
          <TabsTrigger value="roadmaps">My Roadmaps</TabsTrigger>
          <TabsTrigger value="generate">Generate New</TabsTrigger>
          {generatedRoadmap && <TabsTrigger value="view">View Generated</TabsTrigger>}
        </TabsList>
        
        <TabsContent value="roadmaps" className="mt-6">
          {savedRoadmaps.length === 0 ? (
            <div className="text-center p-12 border rounded-lg">
              <h3 className="text-lg font-medium mb-2">No saved roadmaps yet</h3>
              <p className="text-gray-500 mb-4">Generate a new roadmap to get started on your learning journey</p>
              <Button onClick={() => setCurrentTab('generate')}>
                <Plus className="mr-2 h-4 w-4" /> Create New Roadmap
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedRoadmaps.map((roadmap) => (
                <Card key={roadmap.id} className="relative">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteRoadmap(roadmap.id);
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  
                  <CardHeader className="pb-3">
                    <CardTitle>{roadmap.title}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {roadmap.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span>{roadmap.milestones?.length || 0} milestones</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span>{roadmap.totalHours} hours</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm flex justify-between">
                        <span>Progress</span>
                        <span className="font-medium">{roadmap.progress}%</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${roadmap.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="pt-1 text-xs text-gray-500">
                      Last accessed: {roadmap.lastAccessed}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      variant="outline" 
                      className="w-full flex items-center gap-2"
                      onClick={() => handleContinueRoadmap(roadmap)}
                    >
                      Continue <ArrowRight className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="generate" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Generate a Custom Roadmap</CardTitle>
              <CardDescription>
                Describe your goals and our AI will create a personalized learning path
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <label htmlFor="query" className="text-sm font-medium">
                  What do you want to learn?
                </label>
                <Textarea
                  id="query"
                  placeholder="e.g., I want to become a machine learning engineer with a focus on NLP"
                  className="min-h-[120px]"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button 
                onClick={handleGenerateRoadmap} 
                disabled={generating}
              >
                {generating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>Generate Roadmap</>
                )}
              </Button>
            </CardFooter>
          </Card>
          
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-3">Example Prompts</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="cursor-pointer hover:bg-gray-50"
                onClick={() => setQuery("I want to learn frontend development with React and TypeScript")}
              >
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    <Code className="h-5 w-5 text-primary" />
                    <p className="text-sm">I want to learn frontend development with React and TypeScript</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="cursor-pointer hover:bg-gray-50"
                onClick={() => setQuery("Help me build a career path for UX/UI design")}
              >
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    <FileText className="h-5 w-5 text-primary" />
                    <p className="text-sm">Help me build a career path for UX/UI design</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        {generatedRoadmap && (
          <TabsContent value="view" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>{generatedRoadmap.title}</CardTitle>
                <CardDescription>
                  {generatedRoadmap.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {generatedRoadmap.milestones.map((milestone) => (
                    <div 
                      key={milestone.id} 
                      className={`border rounded-lg p-4 space-y-3 ${activeMilestoneId === milestone.id ? 'border-primary bg-primary/5' : ''}`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">Milestone {milestone.id}: {milestone.title}</h3>
                          <p className="text-sm text-gray-600">{milestone.description}</p>
                        </div>
                        {milestone.isCompleted && (
                          <div className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                            Completed
                          </div>
                        )}
                      </div>
                      <Separator />
                      <div>
                        <h4 className="text-sm font-medium mb-2">Resources:</h4>
                        <ul className="space-y-2">
                          {milestone.resources.map((resource, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm">
                              {resource.type === 'video' && (
                                <div className="mt-0.5 text-red-500 bg-red-50 p-1 rounded">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m10 9 5 3-5 3Z"/><circle cx="12" cy="12" r="10"/></svg>
                                </div>
                              )}
                              {resource.type === 'article' && (
                                <div className="mt-0.5 text-blue-500 bg-blue-50 p-1 rounded">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
                                </div>
                              )}
                              {resource.type === 'documentation' && (
                                <div className="mt-0.5 text-green-500 bg-green-50 p-1 rounded">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                                </div>
                              )}
                              <Button 
                                variant="link" 
                                className="h-auto p-0 text-left font-normal"
                                onClick={() => handleSelectResource(milestone, resource)}
                              >
                                {resource.title}
                              </Button>
                              {selectedResource === resource && (
                                <span className="text-xs text-primary font-medium">
                                  (Selected)
                                </span>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-500 flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {milestone.timeEstimate}
                        </div>
                        <Button 
                          variant={activeMilestoneId === milestone.id ? "default" : "outline"} 
                          size="sm" 
                          className="flex items-center gap-1"
                          onClick={() => handleStartMilestone(0, milestone)}
                        >
                          <BookOpen className="h-3 w-3" /> 
                          {activeMilestoneId === milestone.id ? "Currently Learning" : "Start Learning"}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setCurrentTab('generate')}>
                  Regenerate
                </Button>
                <Button onClick={saveGeneratedRoadmap}>
                  Save Roadmap
                </Button>
              </CardFooter>
            </Card>
            
            {/* Flashcards Section */}
            {selectedFlashcards && (
              <div id="flashcards-section" className="mt-8 pt-4 border-t">
                <div className="flex items-center gap-2 mb-4">
                  <Lightbulb className="h-5 w-5 text-amber-500" />
                  <h2 className="text-xl font-bold">
                    {selectedResource 
                      ? `Learn: ${selectedResource.title}`
                      : "Master the Concepts with Flashcards"
                    }
                  </h2>
                  
                  {selectedResource && (
                    <Button variant="link" size="sm" className="ml-auto" onClick={() => window.open(selectedResource.url, '_blank')}>
                      <Link className="h-4 w-4 mr-1" />
                      Open Resource
                    </Button>
                  )}
                </div>
                
                <Card className="p-6">
                  {selectedResource && (
                    <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md text-sm text-blue-700">
                      <p className="font-medium">Resource: {selectedResource.title} ({selectedResource.type})</p>
                      <p className="mt-1">Review this {selectedResource.type} and then test your understanding with the flashcards below.</p>
                    </div>
                  )}
                  
                  <div className="mb-4">
                    <p className="text-gray-600">
                      Reinforce your learning with these interactive flashcards. Master them to earn XP and track your progress.
                    </p>
                  </div>
                  
                  <FlashcardDeck 
                    topic={selectedFlashcards.topic} 
                    flashcards={selectedFlashcards.cards} 
                  />
                </Card>
              </div>
            )}
          </TabsContent>
        )}
      </Tabs>
      
      {/* Confirm Delete Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this roadmap and remove it from your saved paths.
              You'll lose any progress tracking associated with it.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteRoadmap} className="bg-red-500 hover:bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default RoadmapPage;
