-- Seed data for WHB Project Tracker
-- Run this AFTER creating the schema to populate with your existing project data

-- Insert all projects
INSERT INTO projects (id, name, status, priority, category, icon, summary, notes) VALUES
  ('11111111-1111-1111-1111-111111111101', 'William Henry / WHB Companies', 'active', 'high', 'Platform', '🏢',
   'Unified platform consolidating Forest, Vish, Netsuite & Zipper (Pilates). Improve client app experience.',
   'This is the parent company — the central hub everything flows through.'),
  ('11111111-1111-1111-1111-111111111102', 'Spa / Wilson House', 'active', 'high', 'Hospitality', '🧖',
   'Ready to scale. Great campus experience in place. Sky is the limit.',
   'The campus is a great experience. Need to get there to understand it and dream a little.'),
  ('11111111-1111-1111-1111-111111111103', 'Wilson House', 'active', 'medium', 'Hospitality', '🏠',
   'Enhance exposure. Currently on Evolve platform. Needs simple accounting.',
   'Evolve is working well — handles platform + insurance claims.'),
  ('11111111-1111-1111-1111-111111111104', 'WHB Hospitality', 'active', 'high', 'Services', '🧹',
   'Cleaning, maintenance & landscaping services platform with bilingual support.',
   'Cleaning, maintenance, and lawn/landscaping services for businesses.'),
  ('11111111-1111-1111-1111-111111111105', 'BowerTraust', 'active', 'high', 'Construction', '🏗️',
   'Construction/development company. Needs scheduling, accounting, invoicing & timesheets.',
   'Does all building and developing. Used BuilderTrend before but too many features. Avid Bill (used by Elevation) is too complicated. No client-facing exposure needed.'),
  ('11111111-1111-1111-1111-111111111106', 'R Alexander', 'active', 'medium', 'Creative', '🎨',
   'New creative company — brand design & creative builds. Needs scheduling, invoicing & accounting.',
   'New creative company doing brand design and creative builds. PO system can be down the road.'),
  ('11111111-1111-1111-1111-111111111107', 'Piedmont Delicatessen', 'active', 'medium', 'Food & Bev', '🥪',
   'Deli + speakeasy concept. Needs accounting, scheduling, invoicing & a secretive website.',
   'Deli by day, speakeasy by evening. Guests need the password for the speakeasy each night. Pretty cool concept — need background info.'),
  ('11111111-1111-1111-1111-111111111108', 'Community Charter', 'active', 'high', 'Education', '📚',
   'Big project — needs full discussion.',
   'This is a huge one — will have to discuss in depth.'),
  ('11111111-1111-1111-1111-111111111109', 'Paramount', 'active', 'high', 'Education', '💇',
   'Cosmetology school with large expanding campus. Needs full discussion.',
   'Cosmetology school. Large expanding campus. Another big one to discuss.'),
  ('11111111-1111-1111-1111-111111111110', 'WHB Consulting', 'not-launched', 'low', 'Consulting', '💼',
   'Not yet launched.', 'Hasn''t been launched yet.'),
  ('11111111-1111-1111-1111-111111111111', 'Smith & Ballard Salon Collective', 'not-launched', 'low', 'Beauty', '💈',
   'Not yet launched.', 'Hasn''t been launched yet.'),
  ('11111111-1111-1111-1111-111111111112', 'J Rockwell Provisions', 'not-launched', 'low', 'Food & Bev', '🍽️',
   'Not yet launched.', 'Hasn''t been launched yet.'),
  ('11111111-1111-1111-1111-111111111113', 'Downstairs Ice Cream', 'not-launched', 'low', 'Food & Bev', '🍦',
   'Not yet launched.', 'Hasn''t been launched yet.'),
  ('11111111-1111-1111-1111-111111111114', 'Hooraws', 'not-launched', 'low', 'TBD', '🎉',
   'Not yet launched.', 'Hasn''t been launched yet.'),
  ('11111111-1111-1111-1111-111111111115', 'Nello''s Pizzaria', 'not-launched', 'low', 'Food & Bev', '🍕',
   'Not yet launched.', 'Hasn''t been launched yet.'),
  ('11111111-1111-1111-1111-111111111116', 'Garibaldi Club', 'not-launched', 'low', 'TBD', '🏛️',
   'Not yet launched.', 'Hasn''t been launched yet.');

-- Insert requirements for WHB Companies
INSERT INTO requirements (project_id, text, done, tags) VALUES
  ('11111111-1111-1111-1111-111111111101', 'Build a platform handling all needs from one source', false, ARRAY['platform']),
  ('11111111-1111-1111-1111-111111111101', 'Integrate Forest, Vish, Netsuite, Zipper (Pilates)', false, ARRAY['integration']),
  ('11111111-1111-1111-1111-111111111101', 'Pull the websites together', false, ARRAY['web']),
  ('11111111-1111-1111-1111-111111111101', 'Create better app experience for clients to schedule', false, ARRAY['app', 'scheduling']);

-- Insert requirements for Spa / Wilson House
INSERT INTO requirements (project_id, text, done, tags) VALUES
  ('11111111-1111-1111-1111-111111111102', 'Think about ways to blow this one up — we''re in a good place', false, ARRAY['growth']),
  ('11111111-1111-1111-1111-111111111102', 'Leverage the campus experience for marketing', false, ARRAY['marketing']),
  ('11111111-1111-1111-1111-111111111102', 'Site visit needed to understand and dream on it', false, ARRAY['planning']);

-- Insert requirements for Wilson House
INSERT INTO requirements (project_id, text, done, tags) VALUES
  ('11111111-1111-1111-1111-111111111103', 'Enhance exposure', false, ARRAY['marketing']),
  ('11111111-1111-1111-1111-111111111103', 'Evolve platform — currently pleased with it', true, ARRAY['platform']),
  ('11111111-1111-1111-1111-111111111103', 'Evolve handles insurance claims', true, ARRAY['insurance']),
  ('11111111-1111-1111-1111-111111111103', 'Simple accounting needed', false, ARRAY['accounting']);

-- Insert requirements for WHB Hospitality
INSERT INTO requirements (project_id, text, done, tags) VALUES
  ('11111111-1111-1111-1111-111111111104', 'Client platform for easy maintenance requests', false, ARRAY['platform', 'app']),
  ('11111111-1111-1111-1111-111111111104', 'Tech receives requests & tracks time for billing', false, ARRAY['time-tracking', 'billing']),
  ('11111111-1111-1111-1111-111111111104', 'English/Spanish translation built in', false, ARRAY['i18n']),
  ('11111111-1111-1111-1111-111111111104', 'Photo capture for receipts (materials)', false, ARRAY['app']),
  ('11111111-1111-1111-1111-111111111104', 'Overall schedule view', false, ARRAY['scheduling']),
  ('11111111-1111-1111-1111-111111111104', 'Weekly recurring tasks set by administrator', false, ARRAY['scheduling']),
  ('11111111-1111-1111-1111-111111111104', 'Simple accounting needed', false, ARRAY['accounting']);

-- Insert requirements for BowerTraust
INSERT INTO requirements (project_id, text, done, tags) VALUES
  ('11111111-1111-1111-1111-111111111105', 'Easy job schedule builder that dumps into one overall schedule', false, ARRAY['scheduling']),
  ('11111111-1111-1111-1111-111111111105', 'Super easy navigation for project managers', false, ARRAY['ux']),
  ('11111111-1111-1111-1111-111111111105', 'Sub contractor app with schedule tracking & change notifications', false, ARRAY['app', 'scheduling']),
  ('11111111-1111-1111-1111-111111111105', 'Simple accounting with budgeting', false, ARRAY['accounting']),
  ('11111111-1111-1111-1111-111111111105', 'Invoice loading by sub — remote approval & coding by PMs', false, ARRAY['invoicing']),
  ('11111111-1111-1111-1111-111111111105', 'Simple accounting with direct deposit', false, ARRAY['accounting', 'payroll']),
  ('11111111-1111-1111-1111-111111111105', 'Hourly timesheet submissions with location/task tracking', false, ARRAY['time-tracking']);

-- Insert requirements for R Alexander
INSERT INTO requirements (project_id, text, done, tags) VALUES
  ('11111111-1111-1111-1111-111111111106', 'Scheduling features for the barn guys to track', false, ARRAY['scheduling']),
  ('11111111-1111-1111-1111-111111111106', 'Invoice approval system (same as BowerTraust)', false, ARRAY['invoicing']),
  ('11111111-1111-1111-1111-111111111106', 'Simple accounting', false, ARRAY['accounting']),
  ('11111111-1111-1111-1111-111111111106', 'Hourly timesheet submissions with location/task tracking', false, ARRAY['time-tracking']),
  ('11111111-1111-1111-1111-111111111106', 'PO system (future phase — Brian''s request)', false, ARRAY['purchasing']);

-- Insert requirements for Piedmont Delicatessen
INSERT INTO requirements (project_id, text, done, tags) VALUES
  ('11111111-1111-1111-1111-111111111107', 'Accounting system', false, ARRAY['accounting']),
  ('11111111-1111-1111-1111-111111111107', 'Employee scheduling', false, ARRAY['scheduling']),
  ('11111111-1111-1111-1111-111111111107', 'Invoice approval system', false, ARRAY['invoicing']),
  ('11111111-1111-1111-1111-111111111107', 'Website with reservation options', false, ARRAY['web']),
  ('11111111-1111-1111-1111-111111111107', 'Speakeasy section — secretive feel, nightly password system', false, ARRAY['web', 'app']);

-- Insert requirements for Community Charter
INSERT INTO requirements (project_id, text, done, tags) VALUES
  ('11111111-1111-1111-1111-111111111108', 'Full scoping discussion needed', false, ARRAY['planning']);

-- Insert requirements for Paramount
INSERT INTO requirements (project_id, text, done, tags) VALUES
  ('11111111-1111-1111-1111-111111111109', 'Full scoping discussion needed', false, ARRAY['planning']);
