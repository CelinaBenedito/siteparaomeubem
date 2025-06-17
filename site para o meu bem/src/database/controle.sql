CREATE DATABASE controle;
USE controle;

CREATE TABLE tipo(
id INT PRIMARY KEY AUTO_INCREMENT,
titulo VARCHAR(30)
);

create table instituicao(
id INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(50)
);

CREATE TABLE registros(
id INT PRIMARY KEY AUTO_INCREMENT,
valor double (10,2) NOT NULL,
descricao VARCHAR(500),
fkTipo INT,
tituloGasto VARCHAR(50),
fkInstituicao INT,
dataGasto DATE,
dataRegistro timestamp default current_timestamp,
CONSTRAINT fkTipo_registros FOREIGN KEY (fkTipo) REFERENCES tipo(id),
CONSTRAINT fkInstituicao_registros FOREIGN KEY (fkInstituicao) REFERENCES instituicao(id)
);

CREATE TABLE saldo(
id INT PRIMARY KEY AUTO_INCREMENT,
valor float (10,2),
fkInstituicao int,
CONSTRAINT fkInstituicao_saldo FOREIGN KEY (fkInstituicao) REFERENCES instituicao(id)
);


insert into instituicao(nome)
values('Nubank'),
('Itau'),
('Dinheiro fisico'),
('Nenhuma');

insert into tipo(titulo)
values('Comida'),
	('Transporte'),
    ('Roupa'),
    ('Mãe'),
    ('Pai'),
    ('Namorada');
    
    insert into saldo(valor, fkInstituicao)
    values(0, 1),
	(0,2),
    (0,3),
    (0,4);

select * from registros;
select * from tipo;
SELECT * FROM instituicao;
SELECT * FROM saldo;

-- consulta do saldo total
-- SELECT SUM(valor) as valorTotal from saldo;

-- consulta de saldo especifíco por instituição
-- SELECT valor from saldo where fkInstituicao = 2;

-- adição de saldo
-- update saldo set valor = 0 where fkInstituicao = 2;

-- remoção de saldo
-- update saldo set valor = (valor-0) where fkInstituicao = 2;

-- Mostrar instituições e saldo
-- select * from saldo s
-- inner join instituicao i on i.id=s.fkInstituicao;

-- mostrar registros
-- select r.id, r.valor, r.descricao, r.tituloGasto, r.dataGasto, r.dataRegistro, t.titulo as tituloTipo, i.nome as nomeInstituicao
-- from registros r
-- inner join tipo t on t.id = r.fkTipo
-- inner join instituicao i on i.id =r.fkInstituicao;

