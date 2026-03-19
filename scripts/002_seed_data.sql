-- Seed data for LearnHub
-- Note: This creates sample courses, videos, and discussions for demo purposes

-- Create a demo teacher profile (will be linked to auth user later)
DO $$
DECLARE
  demo_teacher_id uuid := '00000000-0000-0000-0000-000000000001';
  course1_id uuid := '11111111-1111-1111-1111-111111111111';
  course2_id uuid := '22222222-2222-2222-2222-222222222222';
  course3_id uuid := '33333333-3333-3333-3333-333333333333';
  course4_id uuid := '44444444-4444-4444-4444-444444444444';
  course5_id uuid := '55555555-5555-5555-5555-555555555555';
  course6_id uuid := '66666666-6666-6666-6666-666666666666';
  video1_id uuid;
  quiz1_id uuid;
BEGIN
  -- Insert demo teacher profile (if not exists)
  INSERT INTO profiles (id, name, email, role, avatar, bio, title, location)
  VALUES (
    demo_teacher_id,
    'Dr. Sarah Chen',
    'sarah.chen@learnhub.demo',
    'teacher',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    'Senior Software Engineer with 15+ years of experience in full-stack development. Passionate about teaching and helping others grow.',
    'Senior Software Engineer & Educator',
    'San Francisco, CA'
  )
  ON CONFLICT (id) DO NOTHING;

  -- Insert sample courses
  INSERT INTO courses (id, teacher_id, title, subtitle, description, thumbnail, category, level, language, duration, price, original_price, rating, reviews_count, students_count, is_bestseller, is_published, tags, what_you_will_learn, requirements, features)
  VALUES
  (
    course1_id,
    demo_teacher_id,
    'Complete Web Development Bootcamp',
    'Learn HTML, CSS, JavaScript, React, Node.js and more',
    'Master web development from the ground up. This comprehensive course covers everything from HTML fundamentals to advanced React patterns and full-stack development with Node.js. Build real-world projects and gain the skills needed to become a professional web developer.',
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800',
    'Web Development',
    'Beginner',
    'English',
    '70 hours',
    49.99,
    199.99,
    4.8,
    1247,
    12543,
    true,
    true,
    ARRAY['HTML', 'CSS', 'JavaScript', 'React', 'Node.js'],
    ARRAY['Build responsive websites from scratch', 'Master JavaScript and ES6+', 'Create React applications', 'Build REST APIs with Node.js', 'Deploy applications to production'],
    ARRAY['No prior programming experience needed', 'A computer with internet access'],
    ARRAY['70 hours of video content', '200+ coding exercises', 'Lifetime access', 'Certificate of completion']
  ),
  (
    course2_id,
    demo_teacher_id,
    'Advanced React & Next.js Masterclass',
    'Master React hooks, context, and Next.js 16 server components',
    'Take your React skills to the next level. Learn advanced patterns, server components, authentication, and build production-ready applications with Next.js 16.',
    'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800',
    'Web Development',
    'Advanced',
    'English',
    '42 hours',
    79.99,
    249.99,
    4.9,
    2103,
    8921,
    true,
    true,
    ARRAY['React', 'Next.js', 'TypeScript', 'Server Components'],
    ARRAY['Build production-ready React applications', 'Master React Server Components', 'Implement authentication and authorization', 'Deploy to Vercel with CI/CD'],
    ARRAY['Solid React fundamentals', 'JavaScript/TypeScript knowledge'],
    ARRAY['42 hours of video content', '150+ coding exercises', 'Real-world projects']
  ),
  (
    course3_id,
    demo_teacher_id,
    'Python for Data Science & ML',
    'From Python basics to machine learning with hands-on projects',
    'Learn Python programming and apply it to data science and machine learning. This course covers Python fundamentals, NumPy, Pandas, data visualization, and machine learning with scikit-learn.',
    'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800',
    'Data Science',
    'Intermediate',
    'English',
    '56 hours',
    59.99,
    199.99,
    4.7,
    1856,
    15632,
    false,
    true,
    ARRAY['Python', 'Data Science', 'Machine Learning', 'Pandas'],
    ARRAY['Master Python programming', 'Analyze data with Pandas', 'Create visualizations', 'Build ML models'],
    ARRAY['Basic programming concepts helpful', 'High school math'],
    ARRAY['56 hours of video content', 'Real-world datasets', 'Jupyter notebooks included']
  ),
  (
    course4_id,
    demo_teacher_id,
    'UI/UX Design Fundamentals',
    'Create beautiful, user-centered designs from scratch',
    'Learn the principles of UI/UX design and create stunning interfaces. This course covers design thinking, wireframing, prototyping, and using tools like Figma.',
    'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800',
    'Design',
    'Beginner',
    'English',
    '28 hours',
    39.99,
    149.99,
    4.6,
    856,
    7845,
    false,
    true,
    ARRAY['UI Design', 'UX Design', 'Figma', 'Prototyping'],
    ARRAY['Understand design principles', 'Create wireframes and prototypes', 'Master Figma', 'Build a design portfolio'],
    ARRAY['No prior design experience needed', 'Access to Figma (free)'],
    ARRAY['28 hours of video content', '50+ design projects', 'Figma templates included']
  ),
  (
    course5_id,
    demo_teacher_id,
    'AWS Cloud Practitioner Certification',
    'Prepare for the AWS exam with hands-on labs',
    'Comprehensive preparation for the AWS Cloud Practitioner certification exam. Includes hands-on labs, practice tests, and real-world scenarios.',
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800',
    'Cloud Computing',
    'Beginner',
    'English',
    '30 hours',
    44.99,
    129.99,
    4.8,
    1234,
    9234,
    true,
    true,
    ARRAY['AWS', 'Cloud Computing', 'Certification'],
    ARRAY['Understand AWS core services', 'Pass the certification exam', 'Deploy cloud infrastructure', 'Manage AWS resources'],
    ARRAY['No prior cloud experience needed', 'AWS Free Tier account'],
    ARRAY['30 hours of video content', '6 practice exams', 'Hands-on labs']
  ),
  (
    course6_id,
    demo_teacher_id,
    'Mobile App Development with Flutter',
    'Build beautiful cross-platform mobile apps',
    'Build beautiful cross-platform mobile apps with Flutter and Dart. Learn to create iOS and Android apps from a single codebase.',
    'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800',
    'Mobile Development',
    'Intermediate',
    'English',
    '35 hours',
    54.99,
    179.99,
    4.5,
    678,
    6123,
    false,
    true,
    ARRAY['Flutter', 'Dart', 'Mobile Development', 'Cross-platform'],
    ARRAY['Build iOS and Android apps', 'Master Flutter widgets', 'State management', 'Deploy to app stores'],
    ARRAY['Basic programming knowledge', 'Computer capable of running emulators'],
    ARRAY['35 hours of video content', '10+ complete apps', 'Source code included']
  )
  ON CONFLICT (id) DO NOTHING;

  -- Insert sections for course 1
  INSERT INTO sections (id, course_id, title, sort_order)
  VALUES
    (gen_random_uuid(), course1_id, 'Getting Started', 1),
    (gen_random_uuid(), course1_id, 'HTML Fundamentals', 2),
    (gen_random_uuid(), course1_id, 'CSS Styling', 3),
    (gen_random_uuid(), course1_id, 'JavaScript Basics', 4),
    (gen_random_uuid(), course1_id, 'React Introduction', 5)
  ON CONFLICT DO NOTHING;

  -- Insert videos for course 1
  INSERT INTO videos (id, course_id, title, duration, video_url, lesson_type, is_free, sort_order)
  VALUES
    ('a1000000-0000-0000-0000-000000000001', course1_id, 'Introduction to Web Development', '10:00', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', 'video', true, 1),
    ('a1000000-0000-0000-0000-000000000002', course1_id, 'HTML Fundamentals', '20:00', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', 'video', true, 2),
    ('a1000000-0000-0000-0000-000000000003', course1_id, 'CSS Styling Basics', '15:00', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', 'video', false, 3),
    ('a1000000-0000-0000-0000-000000000004', course1_id, 'JavaScript Introduction', '25:00', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4', 'video', false, 4),
    ('a1000000-0000-0000-0000-000000000005', course1_id, 'Building Your First Project', '30:00', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4', 'video', false, 5)
  ON CONFLICT (id) DO NOTHING;

  -- Insert videos for course 2
  INSERT INTO videos (id, course_id, title, duration, video_url, lesson_type, is_free, sort_order)
  VALUES
    ('a2000000-0000-0000-0000-000000000001', course2_id, 'React Fundamentals Review', '13:20', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', 'video', true, 1),
    ('a2000000-0000-0000-0000-000000000002', course2_id, 'Advanced Hooks Patterns', '23:20', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', 'video', false, 2),
    ('a2000000-0000-0000-0000-000000000003', course2_id, 'State Management with Context', '18:20', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', 'video', false, 3),
    ('a2000000-0000-0000-0000-000000000004', course2_id, 'Next.js App Router', '26:40', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4', 'video', false, 4)
  ON CONFLICT (id) DO NOTHING;

  -- Insert videos for other courses
  INSERT INTO videos (course_id, title, duration, video_url, lesson_type, is_free, sort_order)
  VALUES
    (course3_id, 'Introduction to Python', '10:00', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', 'video', true, 1),
    (course3_id, 'Variables and Data Types', '15:30', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', 'video', true, 2),
    (course3_id, 'Control Flow', '20:00', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', 'video', false, 3),
    (course4_id, 'What is UX Design?', '8:00', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', 'video', true, 1),
    (course4_id, 'Design Thinking Process', '18:00', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', 'video', false, 2),
    (course5_id, 'AWS Overview', '12:00', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', 'video', true, 1),
    (course5_id, 'Core AWS Services', '25:00', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', 'video', false, 2),
    (course6_id, 'Flutter Setup', '15:00', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', 'video', true, 1),
    (course6_id, 'Dart Fundamentals', '22:00', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', 'video', false, 2)
  ON CONFLICT DO NOTHING;

  -- Insert quiz for HTML video
  INSERT INTO quizzes (id, video_id, pass_threshold)
  VALUES ('b1000000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000002', 70)
  ON CONFLICT (id) DO NOTHING;

  -- Insert quiz questions
  INSERT INTO questions (quiz_id, text, options, correct_index, sort_order)
  VALUES
    ('b1000000-0000-0000-0000-000000000001', 'What does HTML stand for?', ARRAY['Hyper Text Markup Language', 'High Tech Modern Language', 'Hyper Transfer Markup Language', 'Home Tool Markup Language'], 0, 1),
    ('b1000000-0000-0000-0000-000000000001', 'Which tag is used for the largest heading?', ARRAY['<h6>', '<heading>', '<h1>', '<head>'], 2, 2),
    ('b1000000-0000-0000-0000-000000000001', 'What is the correct HTML element for inserting a line break?', ARRAY['<break>', '<lb>', '<br>', '<newline>'], 2, 3)
  ON CONFLICT DO NOTHING;

  -- Insert quiz for React video
  INSERT INTO quizzes (id, video_id, pass_threshold)
  VALUES ('b2000000-0000-0000-0000-000000000001', 'a2000000-0000-0000-0000-000000000002', 80)
  ON CONFLICT (id) DO NOTHING;

  INSERT INTO questions (quiz_id, text, options, correct_index, sort_order)
  VALUES
    ('b2000000-0000-0000-0000-000000000001', 'Which hook is used for side effects in React?', ARRAY['useState', 'useEffect', 'useContext', 'useReducer'], 1, 1),
    ('b2000000-0000-0000-0000-000000000001', 'What does useMemo do?', ARRAY['Manages state', 'Memoizes a value', 'Creates refs', 'Handles side effects'], 1, 2),
    ('b2000000-0000-0000-0000-000000000001', 'When does useCallback recompute?', ARRAY['Every render', 'When dependencies change', 'Never', 'On mount only'], 1, 3)
  ON CONFLICT DO NOTHING;

  -- Insert sample discussions
  INSERT INTO discussions (id, user_id, title, content, category, tags, views_count, likes_count, replies_count, is_pinned, is_solved)
  VALUES
    (gen_random_uuid(), demo_teacher_id, 'Best practices for React Server Components?', 'I''ve been exploring RSC and would love to hear about best practices. When should we use server vs client components? What are the performance implications?', 'React', ARRAY['React', 'Next.js', 'Server Components'], 342, 28, 15, true, true),
    (gen_random_uuid(), demo_teacher_id, 'How to structure a large Next.js project?', 'Working on a large-scale Next.js application and looking for advice on folder structure, code organization, and module patterns. What has worked well for you?', 'Next.js', ARRAY['Next.js', 'Architecture', 'Best Practices'], 256, 19, 12, false, false),
    (gen_random_uuid(), demo_teacher_id, 'TypeScript generics explained', 'Can someone explain TypeScript generics with practical examples? I understand the basics but struggle with more complex scenarios.', 'TypeScript', ARRAY['TypeScript', 'Generics'], 189, 15, 8, false, true),
    (gen_random_uuid(), demo_teacher_id, 'State management in 2026 - Redux vs Zustand vs Jotai', 'What''s the current consensus on state management libraries? I''ve used Redux but heard good things about newer alternatives.', 'React', ARRAY['React', 'State Management', 'Redux'], 423, 35, 22, false, false),
    (gen_random_uuid(), demo_teacher_id, 'Optimizing database queries with Prisma', 'Looking for tips on optimizing Prisma queries for better performance. Any gotchas to watch out for?', 'Database', ARRAY['Prisma', 'Database', 'Performance'], 167, 12, 6, false, false)
  ON CONFLICT DO NOTHING;

  -- Insert sample live classes
  INSERT INTO live_classes (id, teacher_id, course_id, title, description, scheduled_at, duration, max_participants, current_participants, is_active, category, room_name)
  VALUES
    (gen_random_uuid(), demo_teacher_id, course1_id, 'Building a Full-Stack App with Next.js', 'Live coding session where we build a complete application from scratch.', NOW() + INTERVAL '2 days', 90, 100, 45, false, 'Web Development', 'nextjs-fullstack'),
    (gen_random_uuid(), demo_teacher_id, course2_id, 'React Performance Optimization', 'Learn techniques to make your React apps lightning fast.', NOW() + INTERVAL '5 days', 60, 75, 32, false, 'Web Development', 'react-performance'),
    (gen_random_uuid(), demo_teacher_id, course3_id, 'Data Visualization with Python', 'Create stunning visualizations using matplotlib and seaborn.', NOW() + INTERVAL '7 days', 120, 50, 28, false, 'Data Science', 'python-dataviz'),
    (gen_random_uuid(), demo_teacher_id, course4_id, 'UI Design Workshop', 'Hands-on workshop designing a mobile app interface in Figma.', NOW() + INTERVAL '3 days', 90, 40, 22, false, 'Design', 'figma-workshop')
  ON CONFLICT DO NOTHING;

END $$;
