import pool from '../config/database';

async function testConnection() {
  try {
    // Try to get a connection from the pool
    const connection = await pool.getConnection();
    console.log('Successfully connected to MySQL database!');
    
    // Test query to verify database exists
    const [result] = await connection.query('SHOW TABLES');
    console.log('Tables in database:', result);
    
    // Release the connection back to the pool
    connection.release();
    
    console.log('Connection test completed successfully!');
    return true;
  } catch (error) {
    console.error('Failed to connect to MySQL:', error);
    return false;
  } finally {
    // Close the pool
    await pool.end();
  }
}

// Run the test
testConnection()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Test failed:', error);
    process.exit(1);
  }); 