-- DACE Transport — Supabase Schema + Seed
-- Run this in: Supabase Dashboard → SQL Editor → New Query

-- ─── Tables ──────────────────────────────────────────────────────────────────

create table if not exists routes (
  id           serial primary key,
  route_number int  unique not null,
  vehicle_number text,
  driver_name  text,
  driver_phone text,
  arrival_time text
);

create table if not exists boarding_points (
  id         serial primary key,
  route_id   int references routes(id) on delete cascade,
  name       text,
  time       text,
  sort_order int default 0
);

-- Enable Row Level Security (read-only public access)
alter table routes enable row level security;
alter table boarding_points enable row level security;

create policy "Public read routes" on routes for select using (true);
create policy "Public read boarding_points" on boarding_points for select using (true);

-- ─── Seed: Routes ─────────────────────────────────────────────────────────────

insert into routes (route_number, vehicle_number, driver_name, driver_phone, arrival_time) values
  (21, 'TN 22 BS 3669', 'B. KUTTY',        '6379826625', '8:05 AM'),
  (22, 'TN 23 J 1653',  'DEVARAJ P',       '9841785153', '8:00 AM'),
  (23, 'TN 22 BS 4250', 'JAIKAR E',        '9884888497', '8:05 AM'),
  (24, 'TN 11 F 0286',  'MUNIYANDI',       '9840997947', '8:05 AM'),
  (25, 'TN 11 F 0076',  'UDHAYAKUMAR B',   '9940330284', '8:05 AM'),
  (26, 'TN 11 F 0258',  'MANIKANDAN T',    '9176046241', '8:05 AM'),
  (28, 'TN 11 F 0266',  'PALANI S',        '6382206921', '8:05 AM'),
  (29, 'TN 11 T 9910',  'BALAMURUGAN',     '8610378819', '8:05 AM'),
  (30, 'TN 11 T 9820',  'S. JANAKIRAMAN',  '9578616178', '8:05 AM'),
  (31, 'TN 11 T 9808',  'BALAJI K',        '7845960028', '8:05 AM'),
  (32, 'TN 19 B 5497',  'RAMU D',          '7338862194', '8:05 AM'),
  (33, 'TN 19 Y 0381',  'PAULRAJ S',       '9710232726', '8:05 AM'),
  (34, 'TN 22 BW 9344', 'GUNASEKARAN K',   '9500184954', '8:10 AM');

-- ─── Seed: Boarding Points ────────────────────────────────────────────────────

-- Route 21
with r as (select id from routes where route_number = 21)
insert into boarding_points (route_id, name, time, sort_order) select r.id, bp.name, bp.time, bp.ord from r,
(values
  (1,'CHENNAI ONE','6:20 AM'),(2,'KAMATCHI HOSPITAL','6:25 AM'),(3,'KOVILAMBAKKAM','6:40 AM'),
  (4,'PALLAVARAM YARD','6:45 AM'),(5,'ECHANGADU SIGNAL','6:45 AM'),(6,'PALLAVAR GADU','6:47 AM'),
  (7,'HASTHINAPURAM','6:58 AM'),(8,'SANITORIUM','7:05 AM'),(9,'GANDHI ROAD','7:10 AM'),
  (10,'KRISHNA NAGAR','7:20 AM'),(11,'BHARTHI NAGAR','7:30 AM'),(12,'MUDICHUR','7:35 AM'),
  (13,'MANIVAKKAM JUNCTION','7:45 AM'),(14,'PADAPPAI','7:55 AM'),(15,'COLLEGE','8:05 AM')
) as bp(ord,name,time);

-- Route 22
with r as (select id from routes where route_number = 22)
insert into boarding_points (route_id, name, time, sort_order) select r.id, bp.name, bp.time, bp.ord from r,
(values
  (1,'VGP','5:45 AM'),(2,'INJAMBAKAM SIGNAL','5:50 AM'),(3,'VETTUVANGANI','5:55 AM'),
  (4,'PALAVAKKAM','5:57 AM'),(5,'KOTTIVAKKAM','6:00 AM'),(6,'THIRUVANMAIUR RTO','6:02 AM'),
  (7,'THIRUVANMAIUR SIGNAL','6:05 AM'),(8,'TARAMANI','6:08 AM'),(9,'MADHIYA KAILASH','6:10 AM'),
  (10,'SRP TOOLS','6:15 AM'),(11,'BABY NAGAR','6:20 AM'),(12,'VIJAYA NAGAR BUS STAND','6:22 AM'),
  (13,'ADAMBAKAM RAILWAY STATION','6:25 AM'),(14,'PALLIKARANAI','6:45 AM'),(15,'JAYACHANDRAN TEX','6:55 AM'),
  (16,'MEDAVAKKAM JUNCTION','7:00 AM'),(17,'SANTHOSHPURAM','7:05 AM'),(18,'GOURI VAKKAM','7:07 AM'),
  (19,'CHEMBAKKAM','7:10 AM'),(20,'KAMARAJAR PURAM','7:12 AM'),(21,'RAJA KEELPAKAM','7:15 AM'),
  (22,'CAMP ROAD','7:17 AM'),(23,'SELAIYUR POLICE STATION','7:20 AM'),(24,'TAMBARAM MCC','7:25 AM'),
  (25,'COLLEGE','8:00 AM')
) as bp(ord,name,time);

-- Route 23
with r as (select id from routes where route_number = 23)
insert into boarding_points (route_id, name, time, sort_order) select r.id, bp.name, bp.time, bp.ord from r,
(values
  (1,'ENNORE PARKING','5:20 AM'),(2,'IOC','5:50 AM'),(3,'POWER HOUSE BRIDGE','5:53 AM'),
  (4,'KORUKKUPET','5:55 AM'),(5,'BASIN BRIDGE, PULLIANTHOPE','6:15 AM'),(6,'OTTERI POLICE STATION','6:20 AM'),
  (7,'AYNAVARAM','6:25 AM'),(8,'ICF','6:27 AM'),(9,'NEW AVADI ROAD','6:30 AM'),
  (10,'VILIVAKKAM NATHAMUNI','6:35 AM'),(11,'PADI BRIDGE','6:37 AM'),(12,'THIRUMANGALAM','6:40 AM'),
  (13,'MUGAPPIAR GOLDEN FLATS','6:45 AM'),(14,'VADUVANKARAI BRIDGE','6:50 AM'),
  (15,'MADURAVOYAL RATION STORE','6:55 AM'),(16,'MADURAVOYAL TOLL GATE','6:57 AM'),
  (17,'PERUNGALATHUR','7:30 AM'),(18,'MANIVAKKAM','7:45 AM'),(19,'COLLEGE','8:05 AM')
) as bp(ord,name,time);

-- Route 24
with r as (select id from routes where route_number = 24)
insert into boarding_points (route_id, name, time, sort_order) select r.id, bp.name, bp.time, bp.ord from r,
(values
  (1,'ENNORE PARKING','5:40 AM'),(2,'NETHAJI NAGAR','5:42 AM'),(3,'BHARATHIYAR NAGAR','5:45 AM'),
  (4,'PATNATHAR KOVIL','5:50 AM'),(5,'VANNARAPET BEACH KOVIL','5:55 AM'),(6,'KASIMEDU','6:00 AM'),
  (7,'KALMANDAPAM','6:02 AM'),(8,'ROYAPURAM SIGNAL','6:05 AM'),(9,'ROYAPURAM BRIDGE','6:10 AM'),
  (10,'TAMBUCHETTY STREET','6:12 AM'),(11,'STANLEY HOSPITAL','6:14 AM'),(12,'MINT BUS STOP','6:15 AM'),
  (13,'BHARATHI ARTS COLLEGE','6:17 AM'),(14,'MUTHYALPET POLICE STATION','6:20 AM'),(15,'MANNADI','6:25 AM'),
  (16,'HIGH COURT METRO','6:27 AM'),(17,'THALAMAI SAILAGAM METRO','6:30 AM'),(18,'MOUNT ROAD MOSQUE','6:35 AM'),
  (19,'D.2 POLICE STATION','6:37 AM'),(20,'WHITES ROAD','6:39 AM'),(21,'THOUSAND LIGHTS','6:40 AM'),
  (22,'CHURCH PARK','6:42 AM'),(23,'VANAVIL','6:45 AM'),(24,'SAIDAPET','6:50 AM'),
  (25,'GUINDY','6:55 AM'),(26,'ALANDUR METRO','7:00 AM'),(27,'COLLEGE','8:05 AM')
) as bp(ord,name,time);

-- Route 25
with r as (select id from routes where route_number = 25)
insert into boarding_points (route_id, name, time, sort_order) select r.id, bp.name, bp.time, bp.ord from r,
(values
  (1,'K.V.T PARKING YARD','5:30 AM'),(2,'M.R NAGAR','5:40 AM'),(3,'KANNADASAN NAGAR EB','5:43 AM'),
  (4,'BAHARTHI NAGAR','5:45 AM'),(5,'AMBEDKAR COLLEGE','5:50 AM'),(6,'B.B. ROAD','5:52 AM'),
  (7,'JAMALIYA','5:55 AM'),(8,'CHEKILI PALAYAM','6:00 AM'),(9,'PURASAIVAKKAM','6:10 AM'),
  (10,'PERIMET G.1 POLICE STATION','6:15 AM'),(11,'DAILY THANTHI OFFICE','6:17 AM'),
  (12,'EGMORE (BACK SIDE)','6:20 AM'),(13,'DAS PRAKASH HOTEL','6:25 AM'),(14,'SANGAM THEATRE','6:30 AM'),
  (15,'EGA THEATRE','6:33 AM'),(16,'SKY WALK','6:40 AM'),(17,'ARUMBAKKAM MMDA','6:45 AM'),
  (18,'LAKSHMAN SRUTHI VADAPALANI','6:50 AM'),(19,'KASI THEATRE ZAPARKHAN PETTAI','6:54 AM'),
  (20,'SHANTHI PETROL BUNK (AIRPORT OPP)','7:00 AM'),(21,'PALLAVARAM AMMA HOTEL','7:10 AM'),
  (22,'SARAVANA STORES CHROMPET','7:25 AM'),(23,'TAMBARAM','7:25 AM'),(24,'COLLEGE','8:05 AM')
) as bp(ord,name,time);

-- Route 26
with r as (select id from routes where route_number = 26)
insert into boarding_points (route_id, name, time, sort_order) select r.id, bp.name, bp.time, bp.ord from r,
(values
  (1,'JOTHI NAGAR','5:30 AM'),(2,'MANALI','5:40 AM'),(3,'MATHUR MMDA','5:43 AM'),
  (4,'MATHUR GATE','5:45 AM'),(5,'THAPAL PETTI','5:50 AM'),(6,'MOOLA KADAI','5:55 AM'),
  (7,'SHELL PETROL BUNK','6:00 AM'),(8,'MADHAVARAM','6:10 AM'),(9,'PORUR BRIDGE','6:25 AM'),
  (10,'VALASARAWAKKAM IDFC BANK','6:35 AM'),(11,'MEGA MART','6:40 AM'),(12,'VIRUGAMBAKKAM','6:42 AM'),
  (13,'AVICHI SCHOOL','6:45 AM'),(14,'KASI THEATRE','6:52 AM'),(15,'EKKATUTHANGAL METRO','6:57 AM'),
  (16,'ALANDHUR METRO','7:00 AM'),(17,'ALANDHUR COURT','7:03 AM'),(18,'SHANTHI PETROL BUNK','7:07 AM'),
  (19,'CHROMPET','7:20 AM'),(20,'TAMBARAM SANATORIUM','7:26 AM'),(21,'TAMBARAM','7:30 AM'),
  (22,'VANDALUR BRIDGE','7:38 AM'),(23,'COLLEGE','8:05 AM')
) as bp(ord,name,time);

-- Route 28
with r as (select id from routes where route_number = 28)
insert into boarding_points (route_id, name, time, sort_order) select r.id, bp.name, bp.time, bp.ord from r,
(values
  (1,'AVADI YARD','5:45 AM'),(2,'AVADI CHECK POST','5:50 AM'),(3,'J.B ESTATE','6:05 AM'),
  (4,'PARUTHIPET','6:10 AM'),(5,'KUMANANCHAVADI','6:20 AM'),(6,'MANGADU','6:25 AM'),
  (7,'PATTUR','6:35 AM'),(8,'FOUR ROADS KOLLACHERI','6:40 AM'),(9,'KUNDRATHUR','6:45 AM'),
  (10,'MEHTA NAGAR','6:47 AM'),(11,'ANAKAPUTHUR','6:50 AM'),(12,'PAMMAL','6:55 AM'),
  (13,'AATUTHOTTI','7:15 AM'),(14,'PALLAVARAM BUS STAND','7:20 AM'),(15,'TAMBARAM','7:35 AM'),
  (16,'COLLEGE','8:05 AM')
) as bp(ord,name,time);

-- Route 29
with r as (select id from routes where route_number = 29)
insert into boarding_points (route_id, name, time, sort_order) select r.id, bp.name, bp.time, bp.ord from r,
(values
  (1,'PARKING YARD','6:10 AM'),(2,'OLI MOHAMMED PETTAI','6:20 AM'),(3,'KAMALATHERU','6:25 AM'),
  (4,'POOKADAI CHATHIRAM','6:27 AM'),(5,'MOONGIL MANDABAM','6:30 AM'),(6,'KEERAI MANDABAM','6:32 AM'),
  (7,'SEVILIMEDU','6:40 AM'),(8,'INDHRA PETROL BUNK','6:45 AM'),(9,'BUS STAND','6:55 AM'),
  (10,'RANGASAMI KULAM','7:00 AM'),(11,'PERIYAR NAGAR TOLL GATE','7:05 AM'),(12,'PERIYAR NAGAR','7:07 AM'),
  (13,'AYYAMPETTAI','7:10 AM'),(14,'RAJAM PETTAI','7:20 AM'),(15,'WALAJABAD','7:25 AM'),
  (16,'VANRAVASI','7:35 AM'),(17,'ORAGADAM JUNCTION','7:50 AM'),(18,'KARANITHANGAL','7:55 AM'),
  (19,'COLLEGE','8:05 AM')
) as bp(ord,name,time);

-- Route 30
with r as (select id from routes where route_number = 30)
insert into boarding_points (route_id, name, time, sort_order) select r.id, bp.name, bp.time, bp.ord from r,
(values
  (1,'CSI SCHOOL YARD','6:15 AM'),(2,'ITI COLLECTOR OFFICE NEW','6:40 AM'),
  (3,'PILAYAR KOIL COLLECTOR OFFICE','6:45 AM'),(4,'G.H HOSPITAL','6:48 AM'),
  (5,'RATTINA KINARU','6:50 AM'),(6,'VEDACHALAM NAGAR','6:53 AM'),
  (7,'CHENGALPATTU NEW BUS STAND','6:55 AM'),(8,'CHENGALPATTU OLD BUS STAND','7:00 AM'),
  (9,'JSP HOSPITAL','7:03 AM'),(10,'AYAPPAN KOVIL','7:05 AM'),(11,'PARANUR','7:10 AM'),
  (12,'THIRTHERI BUS STAND','7:15 AM'),(13,'S.P KOIL','7:20 AM'),(14,'FORD COMPANY','7:22 AM'),
  (15,'MARAIMALAI NAGAR','7:25 AM'),(16,'KATTANKALATHUR','7:30 AM'),(17,'SRM UNIVERSITY','7:32 AM'),
  (18,'THAILAVARAM','7:35 AM'),(19,'GUDUVANCHERRY BUS STAND','7:37 AM'),(20,'MANIVAKKAM','7:50 AM'),
  (21,'PADAPPAI','8:00 AM'),(22,'COLLEGE','8:05 AM')
) as bp(ord,name,time);

-- Route 31
with r as (select id from routes where route_number = 31)
insert into boarding_points (route_id, name, time, sort_order) select r.id, bp.name, bp.time, bp.ord from r,
(values
  (1,'AVR PARKING YARD','5:30 AM'),(2,'KONIMEDU','5:40 AM'),(3,'PADIANLLUR','6:00 AM'),
  (4,'RED HILLS','6:05 AM'),(5,'VINAYAKAPURAM','6:10 AM'),(6,'RETTERI','6:15 AM'),
  (7,'KOLATHUR','6:20 AM'),(8,'SENTHIL NAGAR','6:23 AM'),(9,'KORATUR','6:30 AM'),
  (10,'KOYAMBEDU','6:35 AM'),(11,'VADAPALANI','6:40 AM'),(12,'ASHOK PILLAR','6:43 AM'),
  (13,'KASI THEATRE','6:45 AM'),(14,'ALANDUR METRO','6:50 AM'),(15,'MEENAMBAKKAM','7:00 AM'),
  (16,'CHROMPET','7:10 AM'),(17,'TAMBARAM','7:20 AM'),(18,'COLLEGE','8:05 AM')
) as bp(ord,name,time);

-- Route 32
with r as (select id from routes where route_number = 32)
insert into boarding_points (route_id, name, time, sort_order) select r.id, bp.name, bp.time, bp.ord from r,
(values
  (1,'PARKING YARD LIGHT HOUSE','5:45 AM'),(2,'SATHYA STUDIO','5:50 AM'),(3,'SANTHOME CHURCH','5:55 AM'),
  (4,'CITY CENTRE','6:00 AM'),(5,'ROYAPETTAH HOSPITAL','6:05 AM'),(6,'MEERSAHABI PETTAI','6:10 AM'),
  (7,'TRIPLICANE','6:20 AM'),(8,'RATHNA CAFE','6:23 AM'),(9,'ICE HOUSE','6:25 AM'),
  (10,'WALAJAH ROAD','6:25 AM'),(11,'PUDUPET MARKET','6:30 AM'),(12,'GEMINI','6:45 AM'),
  (13,'TEYNAMPET ILAYANAR KOIL','6:55 AM'),(14,'SAIDAPET','7:00 AM'),(15,'THIRSULAM AIRPORT','7:15 AM'),
  (16,'CHROMPET SARAVANA STORE','7:25 AM'),(17,'SANITORIUM BRIDGE','7:30 AM'),(18,'POONDI BAZAR','7:30 AM'),
  (19,'MCC EAST TAMBARAM','7:38 AM'),(20,'PERUNGALATHUR','7:42 AM'),(21,'VANDALUR BRIDGE','7:45 AM'),
  (22,'KARASANGAL','7:48 AM'),(23,'PADAPPAI','7:55 AM'),(24,'COLLEGE','8:05 AM')
) as bp(ord,name,time);

-- Route 33
with r as (select id from routes where route_number = 33)
insert into boarding_points (route_id, name, time, sort_order) select r.id, bp.name, bp.time, bp.ord from r,
(values
  (1,'KVT PARKING','5:30 AM'),(2,'BRINDHA THEATRE','5:35 AM'),(3,'PERAMBUR REVATHI','5:38 AM'),
  (4,'D.R.B.C.C SCHOOL','5:40 AM'),(5,'CHEMBIYAN POLICE STATION','5:42 AM'),(6,'VENUS BUS STOP','5:45 AM'),
  (7,'AGARAM JUNCTION','5:48 AM'),(8,'ANNA SALAI DON BOSCO','5:50 AM'),
  (9,'WELDING SHOP PAPER MILLS ROAD','5:52 AM'),(10,'MUGAMBIKAI KOLATHUR','5:55 AM'),
  (11,'RETTARI','6:00 AM'),(12,'KALLIKUPPAM','6:15 AM'),(13,'AMBATHUR OT BUS STOP','6:20 AM'),
  (14,'AMBATHUR DULHUB','6:25 AM'),(15,'TELEPHONE EXCHANGE','6:28 AM'),(16,'MADURAVOYAL TOLL','6:35 AM'),
  (17,'CHETTIAR VANAGARAM','6:38 AM'),(18,'PORUR BUS STOP','6:42 AM'),(19,'MUGALIWAKAM','6:45 AM'),
  (20,'RAMAPURAM','6:50 AM'),(21,'BUTT ROAD','6:55 AM'),(22,'ALANDUR METRO','7:05 AM'),
  (23,'TAMBARAM','7:30 AM'),(24,'PERUNGALUTHUR','7:40 AM'),(25,'COLLEGE','8:05 AM')
) as bp(ord,name,time);

-- Route 34
with r as (select id from routes where route_number = 34)
insert into boarding_points (route_id, name, time, sort_order) select r.id, bp.name, bp.time, bp.ord from r,
(values
  (1,'COLOURS INDIAN SCHOOL YARD','6:45 AM'),(2,'VIT COLLEGE','6:55 AM'),(3,'KANDIGAI','7:00 AM'),
  (4,'KOLAPAKKAM','7:05 AM'),(5,'GUDUVANCHERY MARKET','7:25 AM'),(6,'GUDUVANCHERY EB','7:28 AM'),
  (7,'URAPAKKAM TEA SHOP','7:35 AM'),(8,'URAPAKKAM SCHOOL STOP','7:38 AM'),(9,'VANDALUR ZOO','7:45 AM'),
  (10,'MANIVAKKAM JUNCTION','7:50 AM'),(11,'RUBY BUILDING','7:55 AM'),(12,'KARASANGAL','7:58 AM'),
  (13,'PADAPPAI','8:00 AM'),(14,'SALAMANGALAM','8:03 AM'),(15,'COLLEGE','8:10 AM')
) as bp(ord,name,time);
