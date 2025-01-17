-- Insert test data into the users table
INSERT INTO users (id, name, email) VALUES
  (1, 'Alice', 'alice@example.com'),
  (2, 'Bob', 'bob@example.com'),
  (3, 'Charlie', 'charlie@example.com');

-- Insert test data into the activities table
INSERT INTO activities (id, user_id, name, start_date, distance) VALUES
  (1, 1, 'Morning Run', '2023-01-01', 5000),
  (2, 2, 'Evening Walk', '2023-01-02', 3000),
  (3, 3, 'Cycling', '2023-01-03', 20000);

-- Insert test data into the segments table
INSERT INTO segments (id, name, runs, best_time) VALUES
  (1, 'Segment 1', 5, '00:05:30'),
  (2, 'Segment 2', 3, '00:04:45'),
  (3, 'Segment 3', 8, '00:06:10'); 