-- Seed data for LearnHub

-- Insert sample courses
INSERT INTO courses (id, title, description, instructor_name, instructor_avatar, thumbnail, category, level, duration, price, rating, students_count, is_published)
VALUES
  ('c1000000-0000-0000-0000-000000000001', 'Complete Web Development Bootcamp', 'Learn HTML, CSS, JavaScript, React, Node.js and more. Build real-world projects and become a full-stack developer.', 'Sarah Johnson', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop', 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=450&fit=crop', 'Web Development', 'beginner', 4200, 49.99, 4.8, 12543, true),
  ('c1000000-0000-0000-0000-000000000002', 'Advanced React & Next.js Masterclass', 'Master React hooks, context, Redux, Next.js 14, server components, and build production-ready applications.', 'Michael Chen', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop', 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=450&fit=crop', 'Web Development', 'advanced', 3600, 79.99, 4.9, 8921, true),
  ('c1000000-0000-0000-0000-000000000003', 'Python for Data Science', 'Learn Python programming, NumPy, Pandas, Matplotlib, and machine learning fundamentals.', 'Emily Rodriguez', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop', 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&h=450&fit=crop', 'Data Science', 'intermediate', 3000, 59.99, 4.7, 15632, true),
  ('c1000000-0000-0000-0000-000000000004', 'UI/UX Design Fundamentals', 'Master the principles of user interface and user experience design using Figma.', 'Alex Thompson', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop', 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=450&fit=crop', 'Design', 'beginner', 2400, 39.99, 4.6, 7845, true),
  ('c1000000-0000-0000-0000-000000000005', 'AWS Cloud Practitioner Certification', 'Prepare for the AWS Cloud Practitioner exam with hands-on labs and practice tests.', 'David Kim', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop', 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=450&fit=crop', 'Cloud Computing', 'beginner', 1800, 44.99, 4.8, 9234, true),
  ('c1000000-0000-0000-0000-000000000006', 'Mobile App Development with Flutter', 'Build beautiful cross-platform mobile apps with Flutter and Dart.', 'Jessica Lee', 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop', 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=450&fit=crop', 'Mobile Development', 'intermediate', 2700, 54.99, 4.5, 6123, true);

-- Insert videos for the first course
INSERT INTO videos (id, course_id, title, description, video_url, duration, order_index, is_preview)
VALUES
  ('v1000000-0000-0000-0000-000000000001', 'c1000000-0000-0000-0000-000000000001', 'Introduction to Web Development', 'Welcome to the course! Learn what web development is and what you will achieve.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', 600, 1, true),
  ('v1000000-0000-0000-0000-000000000002', 'c1000000-0000-0000-0000-000000000001', 'HTML Fundamentals', 'Learn the building blocks of web pages with HTML5.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', 1200, 2, false),
  ('v1000000-0000-0000-0000-000000000003', 'c1000000-0000-0000-0000-000000000001', 'CSS Styling Basics', 'Make your websites beautiful with CSS styling.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', 900, 3, false),
  ('v1000000-0000-0000-0000-000000000004', 'c1000000-0000-0000-0000-000000000001', 'JavaScript Introduction', 'Add interactivity to your websites with JavaScript.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4', 1500, 4, false),
  ('v1000000-0000-0000-0000-000000000005', 'c1000000-0000-0000-0000-000000000001', 'Building Your First Project', 'Put it all together and build your first web project.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4', 1800, 5, false);

-- Insert videos for React course
INSERT INTO videos (id, course_id, title, description, video_url, duration, order_index, is_preview)
VALUES
  ('v2000000-0000-0000-0000-000000000001', 'c1000000-0000-0000-0000-000000000002', 'React Fundamentals Review', 'Quick review of React basics before diving deep.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', 800, 1, true),
  ('v2000000-0000-0000-0000-000000000002', 'c1000000-0000-0000-0000-000000000002', 'Advanced Hooks Patterns', 'Master useCallback, useMemo, and custom hooks.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', 1400, 2, false),
  ('v2000000-0000-0000-0000-000000000003', 'c1000000-0000-0000-0000-000000000002', 'State Management with Context', 'Learn to manage global state effectively.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', 1100, 3, false),
  ('v2000000-0000-0000-0000-000000000004', 'c1000000-0000-0000-0000-000000000002', 'Next.js App Router', 'Understanding the new App Router in Next.js.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4', 1600, 4, false);

-- Insert quizzes
INSERT INTO quizzes (id, course_id, video_id, title, passing_score)
VALUES
  ('q1000000-0000-0000-0000-000000000001', 'c1000000-0000-0000-0000-000000000001', 'v1000000-0000-0000-0000-000000000002', 'HTML Fundamentals Quiz', 70),
  ('q1000000-0000-0000-0000-000000000002', 'c1000000-0000-0000-0000-000000000001', 'v1000000-0000-0000-0000-000000000004', 'JavaScript Basics Quiz', 70),
  ('q2000000-0000-0000-0000-000000000001', 'c1000000-0000-0000-0000-000000000002', 'v2000000-0000-0000-0000-000000000002', 'React Hooks Quiz', 80);

-- Insert quiz questions
INSERT INTO quiz_questions (id, quiz_id, question, options, correct_answer, order_index)
VALUES
  ('qq100000-0000-0000-0000-000000000001', 'q1000000-0000-0000-0000-000000000001', 'What does HTML stand for?', '["Hyper Text Markup Language", "High Tech Modern Language", "Hyper Transfer Markup Language", "Home Tool Markup Language"]', 0, 1),
  ('qq100000-0000-0000-0000-000000000002', 'q1000000-0000-0000-0000-000000000001', 'Which tag is used for the largest heading?', '["<h6>", "<heading>", "<h1>", "<head>"]', 2, 2),
  ('qq100000-0000-0000-0000-000000000003', 'q1000000-0000-0000-0000-000000000001', 'What is the correct HTML element for inserting a line break?', '["<break>", "<lb>", "<br>", "<newline>"]', 2, 3),
  ('qq200000-0000-0000-0000-000000000001', 'q1000000-0000-0000-0000-000000000002', 'Which keyword is used to declare a variable in JavaScript?', '["var", "let", "const", "All of the above"]', 3, 1),
  ('qq200000-0000-0000-0000-000000000002', 'q1000000-0000-0000-0000-000000000002', 'What is the output of typeof []?', '["array", "object", "undefined", "list"]', 1, 2),
  ('qq300000-0000-0000-0000-000000000001', 'q2000000-0000-0000-0000-000000000001', 'Which hook is used for side effects in React?', '["useState", "useEffect", "useContext", "useReducer"]', 1, 1),
  ('qq300000-0000-0000-0000-000000000002', 'q2000000-0000-0000-0000-000000000001', 'What does useMemo do?', '["Manages state", "Memoizes a value", "Creates refs", "Handles side effects"]', 1, 2);

-- Insert live classes
INSERT INTO live_classes (id, title, description, instructor_name, instructor_avatar, scheduled_at, duration, meeting_url, max_participants, category)
VALUES
  ('lc100000-0000-0000-0000-000000000001', 'Building a Full-Stack App with Next.js', 'Live coding session where we build a complete application from scratch.', 'Sarah Johnson', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop', NOW() + INTERVAL '2 days', 90, 'https://meet.example.com/nextjs-live', 100, 'Web Development'),
  ('lc100000-0000-0000-0000-000000000002', 'React Performance Optimization', 'Learn techniques to make your React apps lightning fast.', 'Michael Chen', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop', NOW() + INTERVAL '5 days', 60, 'https://meet.example.com/react-perf', 75, 'Web Development'),
  ('lc100000-0000-0000-0000-000000000003', 'Data Visualization with Python', 'Create stunning visualizations using matplotlib and seaborn.', 'Emily Rodriguez', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop', NOW() + INTERVAL '7 days', 120, 'https://meet.example.com/python-viz', 50, 'Data Science'),
  ('lc100000-0000-0000-0000-000000000004', 'UI Design Workshop', 'Hands-on workshop designing a mobile app interface in Figma.', 'Alex Thompson', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop', NOW() + INTERVAL '3 days', 90, 'https://meet.example.com/ui-workshop', 40, 'Design');

-- Insert discussion categories
INSERT INTO discussion_categories (id, name, description, icon, color)
VALUES
  ('dc100000-0000-0000-0000-000000000001', 'General Discussion', 'Talk about anything related to learning and development', 'message-circle', 'blue'),
  ('dc100000-0000-0000-0000-000000000002', 'Course Help', 'Get help with course content and assignments', 'help-circle', 'green'),
  ('dc100000-0000-0000-0000-000000000003', 'Career Advice', 'Discuss career paths, job hunting, and professional growth', 'briefcase', 'purple'),
  ('dc100000-0000-0000-0000-000000000004', 'Project Showcase', 'Share your projects and get feedback from the community', 'folder', 'orange'),
  ('dc100000-0000-0000-0000-000000000005', 'Resources', 'Share helpful resources, articles, and tools', 'link', 'teal');
