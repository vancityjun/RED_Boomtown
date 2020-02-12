--
-- PostgreSQL database dump
--

-- Dumped from database version 12.0
-- Dumped by pg_dump version 12.0

-- Started on 2020-02-10 21:36:42

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 207 (class 1259 OID 16577)
-- Name: items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.items (
    id integer NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    "imageUrl" text,
    "ownerId" integer,
    "borrowerId" integer
);


ALTER TABLE public.items OWNER TO postgres;

--
-- TOC entry 206 (class 1259 OID 16575)
-- Name: items_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.items_id_seq OWNER TO postgres;

--
-- TOC entry 2857 (class 0 OID 0)
-- Dependencies: 206
-- Name: items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.items_id_seq OWNED BY public.items.id;


--
-- TOC entry 208 (class 1259 OID 16596)
-- Name: itemtags; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.itemtags (
    "itemId" integer,
    "tagId" integer
);


ALTER TABLE public.itemtags OWNER TO postgres;

--
-- TOC entry 203 (class 1259 OID 16555)
-- Name: tags; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tags (
    id integer NOT NULL,
    title text NOT NULL
);


ALTER TABLE public.tags OWNER TO postgres;

--
-- TOC entry 202 (class 1259 OID 16553)
-- Name: tags_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tags_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tags_id_seq OWNER TO postgres;

--
-- TOC entry 2858 (class 0 OID 0)
-- Dependencies: 202
-- Name: tags_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tags_id_seq OWNED BY public.tags.id;


--
-- TOC entry 205 (class 1259 OID 16566)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    fullname text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    bio text,
    avatar text
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 204 (class 1259 OID 16564)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 2859 (class 0 OID 0)
-- Dependencies: 204
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 2708 (class 2604 OID 16580)
-- Name: items id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.items ALTER COLUMN id SET DEFAULT nextval('public.items_id_seq'::regclass);


--
-- TOC entry 2706 (class 2604 OID 16558)
-- Name: tags id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tags ALTER COLUMN id SET DEFAULT nextval('public.tags_id_seq'::regclass);


--
-- TOC entry 2707 (class 2604 OID 16569)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 2850 (class 0 OID 16577)
-- Dependencies: 207
-- Data for Name: items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.items (id, title, description, "imageUrl", "ownerId", "borrowerId") FROM stdin;
49	object	testitem	\N	23	\N
50	object	testitem	\N	23	\N
48	shiny object	testitem	\N	23	\N
51	dsl;ksaflasjdlkdja	jdsklfjakldfjl	\N	23	\N
53	full stack developer	full stack	\N	23	\N
54	react	react	\N	23	\N
\.


--
-- TOC entry 2851 (class 0 OID 16596)
-- Dependencies: 208
-- Data for Name: itemtags; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.itemtags ("itemId", "tagId") FROM stdin;
48	1
49	1
50	1
51	6
51	7
53	6
53	5
53	2
54	1
\.


--
-- TOC entry 2846 (class 0 OID 16555)
-- Dependencies: 203
-- Data for Name: tags; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tags (id, title) FROM stdin;
1	Tools
2	Household Items
5	Electronics
6	Physical Media
7	Sporting Goods
8	Musical Instruments
9	Recreational Equipment
\.


--
-- TOC entry 2848 (class 0 OID 16566)
-- Dependencies: 205
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, fullname, email, password, bio, avatar) FROM stdin;
21	Jun	vancityjun@gmail.com	$2a$12$gKz14O.fVv19k9D4m9IRE.jQ0Hm4bGMakp1p5tsyIqmzaBujsfeOa	\N	\N
22	Joker	joker@gmail.com	$2a$12$HCxQXLZoDXm.PEuxNMniweQa12tWriu9tUcIb/kMSFmzm8RfIhsSe	\N	\N
23	Zareef	zareef@red.com	$2a$12$fdtW5AF02GoTHH8IC68lbOsPCSmR/4HAxtDRhiRrcLf0lwwRTWn1O	\N	\N
26	Jun Lee	fewlinclub@gamil.com	$2a$12$1SiKHnNqO9U064CjIJ8JtO/Jj3Y002ZA624egPrkfx9rp4zVJynem	\N	\N
27	Joker	joker@gmail.com	$2a$12$GVqd7.D7BguzTEcNc70Jx.4BBufLXLQuOD2wct1g8a.bm00xIIIkG	\N	\N
28	Jun	vancityjun@gmail.com	$2a$12$KqkMLD.KINPjMNdRs2oCdOhub9lD44SgMnUKv02x8hjXUBqq1rmsS	\N	\N
\.


--
-- TOC entry 2860 (class 0 OID 0)
-- Dependencies: 206
-- Name: items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.items_id_seq', 54, true);


--
-- TOC entry 2861 (class 0 OID 0)
-- Dependencies: 202
-- Name: tags_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tags_id_seq', 9, true);


--
-- TOC entry 2862 (class 0 OID 0)
-- Dependencies: 204
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 28, true);


--
-- TOC entry 2714 (class 2606 OID 16585)
-- Name: items items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.items
    ADD CONSTRAINT items_pkey PRIMARY KEY (id);


--
-- TOC entry 2710 (class 2606 OID 16563)
-- Name: tags tags_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tags
    ADD CONSTRAINT tags_pkey PRIMARY KEY (id);


--
-- TOC entry 2712 (class 2606 OID 16574)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 2716 (class 2606 OID 16591)
-- Name: items items_borrowerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.items
    ADD CONSTRAINT "items_borrowerId_fkey" FOREIGN KEY ("borrowerId") REFERENCES public.users(id);


--
-- TOC entry 2715 (class 2606 OID 16586)
-- Name: items items_ownerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.items
    ADD CONSTRAINT "items_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES public.users(id);


--
-- TOC entry 2717 (class 2606 OID 16599)
-- Name: itemtags itemtags_itemId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.itemtags
    ADD CONSTRAINT "itemtags_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES public.items(id);


--
-- TOC entry 2718 (class 2606 OID 16604)
-- Name: itemtags itemtags_tagId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.itemtags
    ADD CONSTRAINT "itemtags_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES public.tags(id);


-- Completed on 2020-02-10 21:36:43

--
-- PostgreSQL database dump complete
--

