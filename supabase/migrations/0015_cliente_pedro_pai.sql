-- Cria o cliente "Pedro Pai" (Pedro Ivo Moezia de Lima, pai) e reatribui a
-- ele os processos dos quais ele e a parte real, mantendo apenas o
-- processo Aluizio (trabalhista) no cliente teste original.

insert into usuarios (email, senha_hash, tipo, nome)
values (
  'ivomoezia@ig.com.br',
  '$2a$10$P4.yeAxyF//K.V7h.xt1RuyF3014hxZZMsVbYYn5Hxwnjyr9Zrvp6',
  'cliente',
  'Pedro Ivo Moézia de Lima'
)
on conflict (email) do nothing;

update processos
set cliente_id = (select id from usuarios where email = 'ivomoezia@ig.com.br')
where numero in (
  '0705933-76.2026.8.07.0018',
  '0144590-38.2018.8.19.0001',
  '0747388-27.2026.8.07.0016',
  '0806452-02.2025.8.07.0016',
  '8049944-09.2026.8.05.0000',
  '0000338-10.2004.8.05.0069',
  '1095509-18.2024.4.01.3400'
);
