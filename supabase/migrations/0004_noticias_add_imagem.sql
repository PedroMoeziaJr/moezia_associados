-- Adiciona uma imagem de capa opcional as noticias (usada no card da Home e no topo do artigo).
alter table noticias add column if not exists imagem_url text;
