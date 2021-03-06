PGDMP     7    
                x            boomtown    12.1    12.1     &           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            '           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            (           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            )           1262    16393    boomtown    DATABASE     �   CREATE DATABASE boomtown WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'English_United States.1252' LC_CTYPE = 'English_United States.1252';
    DROP DATABASE boomtown;
                postgres    false            �            1259    16394    items    TABLE     �   CREATE TABLE public.items (
    id integer NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    "imageUrl" text,
    "ownerId" integer,
    "borrowerId" integer,
    created date
);
    DROP TABLE public.items;
       public         heap    postgres    false            �            1259    16400    items_id_seq    SEQUENCE     �   CREATE SEQUENCE public.items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.items_id_seq;
       public          postgres    false    202            *           0    0    items_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.items_id_seq OWNED BY public.items.id;
          public          postgres    false    203            �            1259    16402    itemtags    TABLE     L   CREATE TABLE public.itemtags (
    "itemId" integer,
    "tagId" integer
);
    DROP TABLE public.itemtags;
       public         heap    postgres    false            �            1259    16405    tags    TABLE     O   CREATE TABLE public.tags (
    id integer NOT NULL,
    title text NOT NULL
);
    DROP TABLE public.tags;
       public         heap    postgres    false            �            1259    16411    tags_id_seq    SEQUENCE     �   CREATE SEQUENCE public.tags_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.tags_id_seq;
       public          postgres    false    205            +           0    0    tags_id_seq    SEQUENCE OWNED BY     ;   ALTER SEQUENCE public.tags_id_seq OWNED BY public.tags.id;
          public          postgres    false    206            �            1259    16413    users    TABLE     �   CREATE TABLE public.users (
    id integer NOT NULL,
    fullname text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    bio text,
    avatar text
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    16419    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false    207            ,           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    208            �
           2604    16421    items id    DEFAULT     d   ALTER TABLE ONLY public.items ALTER COLUMN id SET DEFAULT nextval('public.items_id_seq'::regclass);
 7   ALTER TABLE public.items ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    203    202            �
           2604    16422    tags id    DEFAULT     b   ALTER TABLE ONLY public.tags ALTER COLUMN id SET DEFAULT nextval('public.tags_id_seq'::regclass);
 6   ALTER TABLE public.tags ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    206    205            �
           2604    16423    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    208    207                      0    16394    items 
   TABLE DATA           e   COPY public.items (id, title, description, "imageUrl", "ownerId", "borrowerId", created) FROM stdin;
    public          postgres    false    202   B                  0    16402    itemtags 
   TABLE DATA           5   COPY public.itemtags ("itemId", "tagId") FROM stdin;
    public          postgres    false    204   �                   0    16405    tags 
   TABLE DATA           )   COPY public.tags (id, title) FROM stdin;
    public          postgres    false    205   D!       "          0    16413    users 
   TABLE DATA           K   COPY public.users (id, fullname, email, password, bio, avatar) FROM stdin;
    public          postgres    false    207   �!       -           0    0    items_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.items_id_seq', 64, true);
          public          postgres    false    203            .           0    0    tags_id_seq    SEQUENCE SET     9   SELECT pg_catalog.setval('public.tags_id_seq', 9, true);
          public          postgres    false    206            /           0    0    users_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.users_id_seq', 28, true);
          public          postgres    false    208            �
           2606    16425    items items_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.items
    ADD CONSTRAINT items_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.items DROP CONSTRAINT items_pkey;
       public            postgres    false    202            �
           2606    16427    tags tags_pkey 
   CONSTRAINT     L   ALTER TABLE ONLY public.tags
    ADD CONSTRAINT tags_pkey PRIMARY KEY (id);
 8   ALTER TABLE ONLY public.tags DROP CONSTRAINT tags_pkey;
       public            postgres    false    205            �
           2606    16429    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    207            �
           2606    16430    items items_borrowerId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.items
    ADD CONSTRAINT "items_borrowerId_fkey" FOREIGN KEY ("borrowerId") REFERENCES public.users(id);
 G   ALTER TABLE ONLY public.items DROP CONSTRAINT "items_borrowerId_fkey";
       public          postgres    false    202    207    2714            �
           2606    16435    items items_ownerId_fkey    FK CONSTRAINT     {   ALTER TABLE ONLY public.items
    ADD CONSTRAINT "items_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES public.users(id);
 D   ALTER TABLE ONLY public.items DROP CONSTRAINT "items_ownerId_fkey";
       public          postgres    false    202    207    2714            �
           2606    16440    itemtags itemtags_itemId_fkey    FK CONSTRAINT        ALTER TABLE ONLY public.itemtags
    ADD CONSTRAINT "itemtags_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES public.items(id);
 I   ALTER TABLE ONLY public.itemtags DROP CONSTRAINT "itemtags_itemId_fkey";
       public          postgres    false    202    204    2710            �
           2606    16445    itemtags itemtags_tagId_fkey    FK CONSTRAINT     |   ALTER TABLE ONLY public.itemtags
    ADD CONSTRAINT "itemtags_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES public.tags(id);
 H   ALTER TABLE ONLY public.itemtags DROP CONSTRAINT "itemtags_tagId_fkey";
       public          postgres    false    205    2712    204               �   x�]�K�@D�=��`p�0&$�pͦ� �����H���J%��Uq�nـ���9�t�"��Lʁ�u��%JBhh �̽w��v������M�+R�����-A��#�b�w����N㍑p�`3� '2�~�� /d�2%[�b2�a�`��b'�� ��O�         9   x�%��  C�3�J����xy�O��B���M6N%]�p0>�����:��a-	�          w   x�%��
�0 �s��A��0t��L�^J\�Kf��{��m�Zwp�f4k�apZ��J^U8vp���)�0R���Z��Ϊ��c��A�k[H���J�Y�K����|l�a�)�      "   �   x�M���0  ���<*hG�4@$!,<ZZ� ���>�`r��n@QM�P�~cM�U��+Y�2m�ܴ]z"�}tp����;)OT÷�>9����Ɩ%���2z#A1�	[�z��N��B�Qg��X�AE'v��X��`t���v�0Se�1q���KE����9�     