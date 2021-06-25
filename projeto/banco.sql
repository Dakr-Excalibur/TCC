
drop database  if exists tcc ;
create database  tcc ;
use tcc;
 
create table tb_perfil(
cd_perfil int not null auto_increment,
nm_nickname varchar(45) not null,
nm_email varchar(85) not null unique,
nm_senha  varchar(35) not null,
dt_nasc date not null,
ds_sexo enum('M','F','I'),
ds_imagem varchar(255),
constraint pk_perfil Primary key (cd_perfil));
                
                
create table tb_grupo(
cd_grupo int not null auto_increment,
nm_grupo varchar(45) not null,
ds_grupo text,
ds_imagem varchar(255),
dt_criacao date not null,
constraint pk_grupo	Primary key (cd_grupo));        

        
     create table tb_tipo_chat(
cd_tipo_chat int not null auto_increment,
nm_tipo_chat varchar(45),
	constraint pk_tipo_chat	Primary key (cd_tipo_chat));
        

 create table tb_amigo(
cd_amigo int not null auto_increment,
dt_amizade date,
cd_de int not null,
cd_para int not null,
constraint pk_amigo	Primary key (cd_amigo),
constraint fk_amigo_de_perfil foreign key(cd_de) references tb_perfil(cd_perfil),
constraint fk_amigo_para_perfil foreign key(cd_para) references tb_perfil(cd_perfil));


 create table tb_tipo_denuncia(
cd_tipo_denuncia int not null auto_increment,
nm_tipo_denuncia varchar(45),
constraint pk_tipo_denuncia	primary key (cd_tipo_denuncia));
    
create table tb_tipo_postagem(
cd_tipo_postagem int not null auto_increment,
nm_tipo_postagem varchar(20),
constraint pk_tipo_postagem primary key(cd_tipo_postagem)
);

create table tb_postagem(
cd_postagem int not null auto_increment,
nm_titulo varchar(255) not null,
dt_postagem date not null,
hr_postagem  time not null,
ds_imagem varchar(255),
cd_perfil int,
cd_tipo_postagem int not null,
constraint pk_postagem	Primary key (cd_postagem),
constraint fk_postagem_perfil	foreign key(cd_perfil) 	references tb_perfil(cd_perfil),
constraint fk_postagem_tipo_postagem	foreign key(cd_tipo_postagem) 	references tb_tipo_postagem(cd_tipo_postagem));

        
  create table tb_chat(
cd_chat int not null auto_increment,
ds_mensagem text not null,
cd_de int not null,
cd_para int,
cd_grupo int,
cd_tipo_chat int not null,
constraint pk_chat Primary key (cd_chat),
constraint fk_chat_perfil_de	foreign key(cd_de) 	references tb_perfil(cd_perfil),
constraint fk_chat_perfil_para	foreign key(cd_para) 	references tb_perfil(cd_perfil),
constraint fk_chat_tipo_chat  foreign key(cd_tipo_chat)  references tb_tipo_chat(cd_tipo_chat),
constraint fk_chat_grupo foreign key(cd_grupo)  references tb_grupo(cd_grupo));

create table tb_tipo_notificacao(
cd_tipo_notificacao int not null auto_increment,
nm_tipo_notificacao varchar(25) not null,
constraint pk_tipo_notificacao primary key (cd_tipo_notificacao)
);

     create table tb_notificacao(
cd_notificacao int not null auto_increment,
ic_status char(1),
cd_de int,
cd_para int,
cd_tipo_notificacao int not null,
constraint pk_notificacao Primary key (cd_notificacao),
constraint fk_notificacao_de_perfil foreign key(cd_de) references tb_perfil(cd_perfil),
constraint fk_notificacao_para_perfil foreign key(cd_para) references tb_perfil(cd_perfil),
constraint fk_notificacao_tipo_notificacao foreign key(cd_tipo_notificacao) references tb_tipo_notificacao(cd_tipo_notificacao));
      
               
     create table tb_denuncia(
cd_denuncia int not null auto_increment,
dt_denuncia date,
cd_tipo_denuncia int,
cd_postagem int,
constraint pk_denuncia	Primary key (cd_denuncia),
constraint fk_denuncia_tipo_denuncia foreign key(cd_tipo_denuncia) 	references tb_tipo_denuncia(cd_tipo_denuncia),
 constraint fk_denuncia_postagem foreign key(cd_postagem) references tb_postagem(cd_postagem));        


     create table tb_curtida(
cd_curtida int not null auto_increment,
cd_postagem int,
cd_perfil int not null,
constraint pk_curtida Primary key (cd_curtida),
constraint fk_curtida_postagem	foreign key(cd_postagem) references tb_postagem(cd_postagem),
constraint fk_curtida_perfil  foreign key(cd_perfil) references tb_perfil(cd_perfil));	

     create table tb_descurtida(
cd_descurtida int not null auto_increment,
cd_postagem int,
cd_perfil int not null,
constraint pk_descurtida Primary key (cd_descurtida),
constraint fk_descurtida_postagem	foreign key(cd_postagem) references tb_postagem(cd_postagem),
constraint fk_descurtida_perfil  foreign key(cd_perfil) references tb_perfil(cd_perfil));	
 

   create table tb_compartilhamento(
cd_compartilhamento int not null auto_increment,
dt_compartilhamento date,
hr_compartilhamento time,
cd_postagem int, 
cd_perfil int,
constraint pk_compartilhamento Primary key (cd_compartilhamento),
constraint fk_compartilhamento_postagem	foreign key(cd_postagem) references tb_postagem(cd_postagem),
constraint fk_compartilhamento_perfil  foreign key(cd_perfil) references tb_perfil(cd_perfil));


  create table tb_comentario(
cd_comentario int not null auto_increment,
ds_comentario text,
dt_comentario date,
hr_comentario time,
cd_postagem int,
cd_perfil int,
constraint pk_comentario Primary key (cd_comentario),
constraint fk_comentario_postagem foreign key(cd_postagem) 	references tb_postagem(cd_postagem),
constraint fk_comentario_perfil  foreign key(cd_perfil) references tb_perfil(cd_perfil));

create table grupo_perfil(
cd_grupo int not null ,
cd_perfil int not null,
ic_administrador int(1),
constraint fk_grupo_perfil_grupo foreign key(cd_grupo) 	references tb_grupo(cd_grupo),
constraint fk_comentario_perfil_perfil  foreign key(cd_perfil) references tb_perfil(cd_perfil));
       





insert into tb_perfil values 
('1','JohnnyTest', 'j@hotmail.com', '123456', '1983-07-05' , 'M', 'assets/img/upload/perfil/fotoUsuarioPadrao.png'),
('2','maria', 'fub66454@bcaoo.com', 'senha123', '1985-10-21', 'F', 'assets/img/upload/perfil/fotoUsuarioPadrao.png'),
('3','joséfferson', 'msu46486@bcaoo.com', '654321', '1988-04-29' , 'I', 'assets/img/upload/perfil/fotoUsuarioPadrao.png'),
('4','Yoda', 'wjj14049@bcaoo.com', 'senha', '1990-05-11',  'M', 'assets/img/upload/perfil/fotoUsuarioPadrao.png'),
('5','Jutson', 'whk67494@eveav.com', 'senha321', '2001-09-12',  'M', 'assets/img/upload/perfil/fotoUsuarioPadrao.png') ,
(6,  'Evelyn', 'evelynmanuelacortereal..evelynmanuelacortereal@soutorigotti.com.br', 'senha', '2019-01-08',  'F', 'assets/img/upload/perfil/fotoUsuarioPadrao.png'),
(7 , "Sônia", "d895602@urhen.com", "senha", "2019-01-08",  "F", "assets/img/upload/perfil/fotoUsuarioPadrao.png"),
(8 , "Sara", "pipbu@ktumail.com", "senha", "2019-03-24",  "F", "assets/img/upload/perfil/fotoUsuarioPadrao.png"),
(9 , "Marina", "enricofilipejoaquimcarvalho__enricofilipejoaquimcarvalho@flama.biz", "senha", "2019-09-19",  "F", "assets/img/upload/perfil/fotoUsuarioPadrao.png"),
(15 , "MarinaSilva", "enricomARUIuimcarvalho_valho@flama.biz", "senha", "2019-03-11",  "F", "assets/img/upload/perfil/fotoUsuarioPadrao.png"),
(10, "Davi", "soniajuliaramos..soniajuliaramos@prognum.com.br", "senha", "2019-10-28",  "M", "assets/img/upload/perfil/fotoUsuarioPadrao.png"),
(16, "Allyson", "a@gmail.com", "senha", "2000-03-21",  "M", "assets/img/upload/perfil/fotoUsuarioPadrao.png"),
(17, "Felipe", "f@hotmail.com", "senha", "2019-10-28",  "M", "assets/img/upload/perfil/fotoUsuarioPadrao.png"),
(18, "Gabriel", "g@gmail.com", "senha", "2019-10-28",  "M", "assets/img/upload/perfil/fotoUsuarioPadrao.png"),
(19, "Richart", "r@gmail.com", "senha", "2019-10-28",  "M", "assets/img/upload/perfil/fotoUsuarioPadrao.png");

insert into tb_perfil (cd_perfil, nm_nickname, nm_email, nm_senha, dt_nasc, ds_sexo, ds_imagem) values 
(11 , "Mauco do fofão", "enMALUCOOOOOalho@flama.biz", "senha", "2012-09-19",  "M", 'assets/img/upload/perfil/fotoUsuarioPadrao.png' ),
(12, "julinha27", "juliaramosYES@prognum.com.br", "senha", "2011-10-28",  "f", 'assets/img/upload/perfil/fotoUsuarioPadrao.png' ),
(13 , 'flavia123','IRMAOMEUIRMAOalho@flama.biz', "senha", "2015-09-19",  "F", 'assets/img/upload/perfil/fotoUsuarioPadrao.png' ),
(14 , "MichaelDouglas", "enlama.biz", "senCEhC\Ca", "2019-09-19",  "M", 'assets/img/upload/perfil/fotoUsuarioPadrao.png' );



insert into tb_grupo (cd_grupo, dt_criacao, nm_grupo, ds_grupo, ds_imagem) values 
('1' ,'2019-11-04', 'grupo de star wars', 'Star wars', 'assets/upload/grupo/vader.jpg'),
('2' ,'2019-11-05', 'grupo de jogos', 'CNPJogos', 'assets/img/grupo/padrao.png'),
('3' ,'2019-03-12', 'grupo de animes', 'Animax', 'assets/img/grupo/padrao.png'),
('4' ,'2019-09-09', 'grupo de naruto', 'Naruto', 'assets/img/grupo/padrao.png'),
('5' ,'2019-10-23', 'grupo de programação', 'E1P', 'assets/img/grupo/padrao.png'),
('6' ,'2019-01-07', 'grupo de YU-GI-OH', 'discutir melhores cartas', 'assets/img/grupo/padrao.png'),
('7' ,'2019-01-12', 'grupo de street fighter', 'combinar partidas', 'assets/img/grupo/padrao.png'),
('8' ,'2019-06-03', 'grupo de dragon ball', 'qual melhor super ou z', 'assets/img/grupo/padrao.png'),
('9' ,'2019-07-19', 'grupo de senhor dos anéis', 'qual o melhor filme', 'assets/img/grupo/padrao.png'),
('10','2019-09-03', 'grupo de UCM', 'quem é o heroi mais forte', 'assets/img/grupo/padrao.png'),
('11' ,'2013-05-17', 'UNO & UNO', 'Bora UNO', 'assets/img/grupo/padrao.png'),
('12','2015-03-23', 'HUNTERSSS', 'TEMOS TODOS A FORÇA de GOn', 'assets/img/grupo/padrao.png'),
('13' ,'2016-02-15', 'mano a muleje', null, 'assets/img/grupo/padrao.png'),
('14' ,'2012-02-13', 'cara a cara', null, 'assets/img/grupo/padrao.png'),
('15','2017-05-13', 'CACHORROS ANONIMOS', null, 'assets/img/grupo/padrao.png'),
('16','2017-05-13', 'See you space cowboy ', 'Melhor anime ever', 'assets/upload/grupo/spike.jpg');





insert into tb_amigo values 
('1' ,'2018-08-01', 1, 2),
('14','2015-06-27', 2, 3),
('3' ,'2018-05-13', 4, 5),
('4' ,'2014-12-23', 6, 1),
('5' ,'2019-10-22', 2 , 4),
('11','2019-01-16', 1, 3),
('2' ,'2019-07-02', 3,  6),
('12','2019-09-25', 7,  2),
('13','2019-10-15', 2,   4),
('10','2019-10-30', 9, 3),
('15','2019-10-30', 17, 16),
('16','2019-10-30', 17, 6),
('17','2019-10-30', 17, 1);

insert into tb_tipo_chat values 
('1' ,'amigo'),
('2' ,'grupo'),
('3' ,'geral');


insert into tb_tipo_denuncia values 
('1' ,'Discurso de ódio'),
('2' ,'Racismo'),
('3' ,'Xingamentos'),
('4' ,'Xenofobia'),
('5' ,'Nudez');

insert into tb_chat values 
('1' ,'oi', '1', '2',null, '1'),
('2' ,'tudo bem', '2', '1',null, '1'),
('3' ,'sei lá', '3', '4',null, '1'),
('4' ,'hello', '4', '5',null, '1'),
('5' ,'how are you?', '5', '4',null, '1'),
('6' ,'eae', 3, null,null, '3'),
('7' ,'tranquilo?', 4, null,null, '3'),
('8' ,'como vai?', 5, null,null, '3'),
('9' ,'tudo bem e você', 6, null,null, '3'),
('10' ,'1 dia', 7, null,null, '3'),
('11' ,'vem cá', 8, null,null, '3'),
('12' ,'manda ir agora', 9, null,null, '3'),
('13' ,'bicoito mae', 10, null,null, '3'),
('14' ,'itiii maliaaa', 11, null,null, '3'),
('15' ,'to você', 12, null,null, '3'),
('16','sim', 13, null,null, '3'),
('17','olá', '17', 16, null, '1'),
('18','oi', '16', 17, null, '1'),
('20','Fazer ou não fazer não existe tentar', 17, null, 1, '2'),
('21','Salve salve Yodinha', 16, null, 1, '2'),
('22','eae', 1, null, 2, '2'),
('23','tranquilo?', 3, null, 2, '2'),
('24','to suave', 1, null, 2, '2');

insert into tb_chat values 
('25','então ok', 6, null, 2, '2');

insert into tb_tipo_postagem(cd_tipo_postagem, nm_tipo_postagem) values
(1,'Foto'),
(2,'Video'),
(3, 'Audio'),
(4, 'Apenas texto');



/*
insert into tb_postagem (cd_postagem, nm_titulo, dt_postagem, hr_postagem, ds_imagem, qt_curtida, qt_descurtida, qt_comentario, qt_compartilhamento, qt_denuncia, cd_perfil) values 
(1, 'selfie na BGs', '2019-01-04', '8:55', 'assets/img/upload/postagem/link1.jpg', 1, 1, 1, 1,1, 1, 1),
(2, 'Jogando Fortnite', '2019-01-20', '11:56', 'assets/img/upload/postagem/link2.jpg',1, 1, 1, 1,1, '15', 1),
(3, 'Partiu lolzinho', '2019-02-07', '12:56', 'assets/img/upload/postagem/link3.jpg',1, 1, 1, 1,1, '3', 1),
(4, 'Senhor dos aneis no final de semana', '2019-02-17', '17:55', 'assets/img/upload/postagem/link4.jpg',1, 1, 1, 1,1, '4', 1),
(5, 'Coringa no oscar', '2019-03-11', '9:03','assets/img/upload/postagem/link5.jpg',1, 1, 1, 1,1, '5', 1),
(6 , 'Thor vs Shazam', '2019-02-10', '10:30', 'assets/img/upload/postagem/link6.jpg',1, 1, 1, 1,1, '6', 1),
(7 , 'Marvel ou DC ?', '2019-04-15', '21:15', 'assets/img/upload/postagem/link7.jpg',1, 1, 1, 1,1, '7', 1),
(8 , 'Qual o melhor Robin ?', '2019-06-12', '20:33', 'assets/img/upload/postagem/link8.jpg', 1, 1, 1, 1,1,'1', 1),
(9 , 'Heath Ledger ou Joaquin Phoenix ?', '2019-07-29', '11:57', 'assets/img/upload/postagem/link9.jpg',1, 1, 1, 1,1, '1', 1),
(10, 'final de semana', '2019-02-17', '17:55', null,1, 1, 1, 1,1, '4', 1),
(11, 'oscar', '2019-03-11', '9:03', null,1, 1, 1, 1,1, '5', 1),
(12 , 'Fat Thor > Skinny Thor ', '2019-02-10', '10:30', 'assets/img/upload/postagem/link11.jpg',1, 1, 1, 1,1, '6', 1),
(13 , 'Marvel', '2019-04-15', '21:15', null,1, 1, 1, 1,1, '7', 1),
(14 ,'rafasssss', '2017-01-15', '21:15', null,1, 1, 1, 1,1, '7', 1),
(15 ,'mulekadas', '2019-04-12', '20:33', null,1, 1, 1, 1,1, '1', 1),
(16 ,'manucuriva', '2013-01-19', '11:57', null,1, 1, 1, 1,1, '7', 1),
(17 ,'gatasss', '2019-02-27', '15:44', null,1, 1, 1, 1,1, '14', 1),
(18, 'Jogo do One Punch-Man', '2019-08-27', '15:44', 'assets/img/upload/postagem/link10.jpg',1, 1, 1, 1,1, '11', 1); */
insert into tb_postagem (cd_postagem, nm_titulo, dt_postagem, hr_postagem, ds_imagem, cd_perfil, cd_tipo_postagem) values 
(1, 'selfie na BGs', '2019-01-04', '8:55', 'assets/upload/postagem/img/link1.jpg', 1, 1),
(2, 'Jogando Fortnite', '2019-01-20', '11:56', 'assets/upload/postagem/img/link2.jpg', '15', 1),
(3, 'Partiu lolzinho', '2019-02-07', '12:56', 'assets/upload/postagem/img/link3.jpg','3', 1),
(4, 'Senhor dos aneis no final de semana', '2019-02-17', '17:55', 'assets/upload/postagem/img/link4.jpg', '4', 1),
(5, 'Coringa no oscar', '2019-03-11', '9:03','assets/upload/postagem/img/link5.jpg', '5', 1),
(6 , 'Thor vs Shazam', '2019-02-10', '10:30', 'assets/upload/postagem/img/link6.jpg', '6', 1),
(7 , 'Marvel ou DC ?', '2019-04-15', '21:15', 'assets/upload/postagem/img/link7.jpg','7', 1),
(8 , 'Qual o melhor Robin ?', '2019-06-12', '20:33', 'assets/upload/postagem/img/link8.jpg', '1', 1),
(9 , 'Heath Ledger ou Joaquin Phoenix ?', '2019-07-29', '11:57', 'assets/upload/postagem/img/link9.jpg', '1', 1),
(10, 'final de semana', '2019-02-17', '17:55', null, '4', 4),
(11, 'oscar', '2019-03-11', '9:03', null, '5', 4),
(12 , 'Fat Thor > Skinny Thor ', '2019-02-10', '10:30', 'assets/upload/postagem/img/link11.jpg', '6', 1),
(13 , 'Marvel', '2019-04-15', '21:15', null, '7', 4),
(14 ,'rafasssss', '2017-01-15', '21:15', null, '7', 4),
(15 ,'mulekadas', '2019-04-12', '20:33', null, '1', 4),
(16 ,'manucuriva', '2013-01-19', '11:57', null, '7', 4),
(17 ,'gatasss', '2019-02-27', '15:44', null, '14', 4),
(18, 'Jogo do One Punch-Man', '2019-08-27', '15:44', 'assets/upload/postagem/img/link10.jpg', '11', 1),
(19, 'Melhor luta do anime', '2020-03-3', '15:44', 'assets/upload/postagem/videos/link12.mp4', '17', 2),
(20, 'Goodbyes', '2020-03-10', '15:44', 'assets/upload/postagem/audio/link13.mp3', '17', 3);


insert into tb_curtida values 
('1', '1'  ,  '1'),
('2', '3'  ,  '2'),
('3', '3'  ,  '3'),
('4', '4'  ,  '4' ),
('5', '5'  ,  '5'),
('6' , '6' ,  '6'),
('7' , '7' ,  '7'),
('8' , '8' ,  '8'),
('9' , '9' ,  '9'),
('10', '10', '10');

/*insert into tb_curtida (cd_curtida, cd_postagem, cd_perfil) values
('1', '6', '6' ),
('7', '7', '7' ),
('8', '8', '8' ),
('14', '9', '9' ),
('10', '10', '10'); */

insert into tb_compartilhamento values 
('13', '2019-04-25', '18:23',  '1',  '1'),
('15', '2019-07-29', '17:59', '2',  '2'),
('14', '2019-04-12', '00:14',  '3',  '3'),
('4', '2019-06-26', '14:10',  '4',  '4'),
('5', '2019-10-04', '23:09', '5',  '5'),
('6', '2019-04-11', '23:09',  '6',  '6'),
('7', '2019-07-08', '08:11',  '7',  '7'),
('8', '2019-01-20', '10:41',  '8',  '8'),
('11', '2019-03-19', '17:54', '9',  '9'),
('12', '2019-02-15','17:54',  '10', '10');

insert into tb_compartilhamento (cd_compartilhamento, dt_compartilhamento, hr_compartilhamento, cd_postagem, cd_perfil) values 
('3', '2017-03-19', '13:14', '9',  '9'),
('2', '2013-02-19', '11:54', '9',  '9'),
('1', '2014-01-19', '15:44', '9',  '9'),
('9', '2013-03-11', '14:14', '9',  '9'),
('19', '2014-01-23', '11:13','7',  '8');


insert into tb_comentario values 
('1', 'show', '2019-04-07', '19:03', '1', 1),
('2', 'gostei mto', '2019-04-21', '18:56', '2', 2),
('3', 'bora', '2019-06-09', '19:04',  '3', 3),
('4', 'boa sorte', '2019-07-16', '19:02', '4', 4),
('5', 'concordo', '2019-10-14', '19:01',  '5', 5),
('6' , 'bom', '2019-10-26', '02:39',  '6', 6),
('7' , 'não gostei', '2019-10-22', '20:07',  '7', 7),
('11' , 'chato', '2019-09-09', '20:03', '8', 8),
('12' , 'muito bom', '2019-03-22', '20:07',  '9', 9),
('10', 'bem loko', '2019-07-02', '02:39',  '10', 10);

insert into tb_comentario (cd_comentario,ds_comentario, dt_comentario, hr_comentario, cd_postagem, cd_perfil) values 
('8' ,'AFFS VAMOS', '2011-04-01', '20:00', '8', '8'),
('9' ,'Poxa vida', '2011-03-25', '20:02', '9', '9'),
('13','AMIGASSS', '2013-07-12', '02:39', '10', '10');

/*
insert into tb_notificacao values
('1' , '3', '1', '1'),
('2' , '4', '2', '2'),
('3' , '5', '3', '3'),
('4' , '2', '4', '4'),
('5' , '1', '5', '5'),
('6' , '5', '6', '6'),
('7' , '1', '7', '7'),
('8' , '5', '3', '1'),
('9' , '6', '9', '1'),
('10', '7', '4', '1'); */

/*insert into tb_notificacao (cd_notificacao, cd_chat, cd_postagem) values
('11' , '1', '11'),
('13' , '2', '12'),
('15' , '2', '14'),
('12', '4', '13'); */

insert into tb_tipo_notificacao(cd_tipo_notificacao, nm_tipo_notificacao) values
(1, "Mensagem"),
(2, "Postagem"),
(3, "Denuncia"),
(4, "Grupo"),
(5, "Curtida"),
(6, "Comentario"),
(7, "Solicitação de amizade");

insert into tb_notificacao(ic_status, cd_de, cd_para, cd_tipo_notificacao) values
('0', 18, 17, 7),
('0', 19, 17, 7);
-- ('0', 1, 17, 2); 


insert into tb_denuncia values 
('1', '2019-04-11','1', '4'),
('2', '2019-07-08','2', '5'),
('3', '2019-01-20','3', '4'),
('4', '2019-03-19','4', '3'),
('5', '2019-02-15','5', '2'),
('6' , '2019-02-25','4', '7'),
('7' , '2019-04-01','3', '2'),
('8' , '2019-05-11','2', '8'),
('9' , '2019-06-30','1', '7'),
('10', '2019-10-06','1', '8'),
('11', '2019-10-06','1', '19'),
('12', '2019-10-07','1', '19');


insert into tb_denuncia (cd_denuncia, dt_denuncia, cd_tipo_denuncia) values 
('13', '2019-02-15',3),
('14' , '2016-02-23',2),
('15' , '2014-02-09',2),
('16' , '2012-03-18',4),
('17' , '2014-05-30',5),
('18', '2016-10-06',1);



insert into grupo_perfil(cd_grupo, cd_perfil, ic_administrador) values
(1, 16, 0),
(1, 17, 1),
(2, 1,  1),
(2, 2,  0),
(2, 6,  0),
(2, 17,  0),
(16, 17,  1),
(16, 1,  1),
(16, 3,  1);




insert into tb_perfil values 
('1','JohnnyTest', 'j@hotmail.com', '123456', '1983-07-05' , 'M', 'assets/img/upload/perfil/fotoUsuarioPadrao.png'),
('2','maria', 'fub66454@bcaoo.com', 'senha123', '1985-10-21', 'F', 'assets/img/upload/perfil/fotoUsuarioPadrao.png'),
('3','joséfferson', 'msu46486@bcaoo.com', '654321', '1988-04-29' , 'I', 'assets/img/upload/perfil/fotoUsuarioPadrao.png'),
('4','Yoda', 'wjj14049@bcaoo.com', 'senha', '1990-05-11',  'M', 'assets/img/upload/perfil/fotoUsuarioPadrao.png'),
('5','Jutson', 'whk67494@eveav.com', 'senha321', '2001-09-12',  'M', 'assets/img/upload/perfil/fotoUsuarioPadrao.png') ,
(6,  'Evelyn', 'evelynmanuelacortereal..evelynmanuelacortereal@soutorigotti.com.br', 'senha', '2019-01-08',  'F', 'assets/img/upload/perfil/fotoUsuarioPadrao.png'),
(7 , "Sônia", "d895602@urhen.com", "senha", "2019-01-08",  "F", "assets/img/upload/perfil/fotoUsuarioPadrao.png"),
(8 , "Sara", "pipbu@ktumail.com", "senha", "2019-03-24",  "F", "assets/img/upload/perfil/fotoUsuarioPadrao.png"),
(9 , "Marina", "enricofilipejoaquimcarvalho__enricofilipejoaquimcarvalho@flama.biz", "senha", "2019-09-19",  "F", "assets/img/upload/perfil/fotoUsuarioPadrao.png"),
(15 , "Marina", "enricomARUIuimcarvalho_valho@flama.biz", "senha", "2019-03-11",  "m", "assets/img/upload/perfil/fotoUsuarioPadrao.png"),
(10, "Davi", "soniajuliaramos..soniajuliaramos@prognum.com.br", "senha", "2019-10-28",  "M", "assets/img/upload/perfil/fotoUsuarioPadrao.png"),
(16, "Allyson", "a@gmail.com", "senha", "2000-03-21",  "M", "assets/img/upload/perfil/fotoUsuarioPadrao.png"),
(17, "Felipe", "f@hotmail.com", "senha", "2019-10-28",  "M", "assets/img/upload/perfil/fotoUsuarioPadrao.png"),
(18, "Gabriel", "g@gmail.com", "senha", "2019-10-28",  "M", "assets/img/upload/perfil/fotoUsuarioPadrao.png"),
(19, "Richart", "r@gmail.com", "senha", "2019-10-28",  "M", "assets/img/upload/perfil/fotoUsuarioPadrao.png");

insert into tb_perfil (cd_perfil, nm_nickname, nm_email, nm_senha, dt_nasc, ds_sexo, ds_imagem) values 
(11 , "Mauco do fofão", "enMALUCOOOOOalho@flama.biz", "senha", "2012-09-19",  "M", 'assets/img/upload/perfil/fotoUsuarioPadrao.png' ),
(12, "mandaBola", "juliaramosYES@prognum.com.br", "senha", "2011-10-28",  "M", 'assets/img/upload/perfil/fotoUsuarioPadrao.png' ),
(13 , 'SEU IRMÃO MEU IRMÃO','IRMAOMEUIRMAOalho@flama.biz', "senha", "2015-09-19",  "F", 'assets/img/upload/perfil/fotoUsuarioPadrao.png' ),
(14 , "Mauco do TIU", "enlama.biz", "senCEhC\Ca", "2019-09-19",  "M", 'assets/img/upload/perfil/fotoUsuarioPadrao.png' );



insert into tb_grupo (cd_grupo, dt_criacao, nm_grupo, ds_grupo, ds_imagem) values 
('1' ,'2019-11-04', 'grupo de star wars', 'Star wars', 'assets/img/upload/grupo/padrao.jpg'),
('2' ,'2019-11-05', 'grupo de jogos', 'CNPJogos', 'assets/img/upload/grupo/padrao.jpg'),
('11' ,'2019-03-12', 'grupo de animes', 'Animax', 'assets/img/upload/grupo/padrao.jpg'),
('4' ,'2019-09-09', 'grupo de naruto', 'Naruto', 'assets/img/upload/grupo/padrao.jpg'),
('12' ,'2019-10-23', 'grupo de programação', 'E1P', 'assets/img/upload/grupo/padrao.jpg'),
('13' ,'2019-01-07', 'grupo de YU-GI-OH', 'discutir melhores cartas', 'assets/img/upload/grupo/padrao.jpg'),
('7' ,'2019-01-12', 'grupo de street fighter', 'combinar partidas', 'assets/img/upload/grupo/padrao.jpg'),
('14' ,'2019-06-03', 'grupo de dragon ball', 'qual melhor super ou z', 'assets/img/upload/grupo/padrao.jpg'),
('9' ,'2019-07-19', 'grupo de senhor dos anéis', 'qual o melhor filme', 'assets/img/upload/grupo/padrao.jpg'),
('10','2019-09-03', 'grupo de UCM', 'quem é o heroi mais forte', 'assets/img/upload/grupo/padrao.jpg');

insert into tb_grupo (cd_grupo, dt_criacao, nm_grupo, ds_grupo) values 
('5' ,'2013-05-17', 'UNO & UNO', 'Bora UNO'),
('3','2015-03-23', 'HUNTERSSS', 'TEMOS TODOS A FORÇA de GOn');

insert into tb_grupo (cd_grupo, dt_criacao, nm_grupo, ds_imagem) values 
('15' ,'2016-02-15', 'mano a muleje', 'NSVCUWSBVNRUVB'),
('8' ,'2012-02-13', 'cara a cara', 'livdvrekvbevnkfoto8'),
('6','2017-05-13', 'CACHORROS ANONIMOS', 'evheveh2u73c8t8//w1');

insert into tb_amigo values 
('1' ,'2018-08-01', 1, 2),
('14','2015-06-27', 2, 3),
('3' ,'2018-05-13', 4, 5),
('4' ,'2014-12-23', 6, 1),
('5' ,'2019-10-22', 2 , 4),
('11','2019-01-16', 1, 3),
('2' ,'2019-07-02', 3,  6),
('12','2019-09-25', 7,  2),
('13','2019-10-15', 2,   4),
('10','2019-10-30', 9, 3),
('15','2019-10-30', 17, 16),
('16','2019-10-30', 17, 6),
('17','2019-10-30', 17, 1);

insert into tb_tipo_chat values 
('1' ,'amigo'),
('2' ,'grupo'),
('3' ,'geral');


insert into tb_tipo_denuncia values 
('1' ,'discurso de ódio'),
('2' ,'racismo'),
('3' ,'xingamentos'),
('4' ,'xingamentos'),
('5' ,'xingamentos'),
('6' ,'xenofobia'),
('7' ,'xenofobia'),
('8' ,'discurso de ódio'),
('9' ,'racismo'),
('10','xingamentos');

insert into tb_chat values 
('1' ,'oi', '1', '2',null, '1'),
('2' ,'tudo bem', '2', '1',null, '1'),
('3' ,'sei lá', '3', '4',null, '1'),
('4' ,'hello', '4', '5',null, '1'),
('5' ,'how are you?', '5', '4',null, '1'),
('6' ,'eae', 3, null,null, '3'),
('7' ,'tranquilo?', 4, null,null, '3'),
('8' ,'como vai?', 5, null,null, '3'),
('9' ,'tudo bem e você', 6, null,null, '3'),
('10' ,'1 dia', 7, null,null, '3'),
('11' ,'vem cá', 8, null,null, '3'),
('12' ,'manda ir agora', 9, null,null, '3'),
('13' ,'bicoito mae', 10, null,null, '3'),
('14' ,'itiii maliaaa', 11, null,null, '3'),
('15' ,'to você', 12, null,null, '3'),
('16','sim', 13, null,null, '3'),
('17','olá', '17', 16, null, '1'),
('18','oi', '16', 17, null, '1'),
('20','Fazer ou não fazer não existe tentar', 17, null, 1, '2'),
('21','Salve salve Yodinha', 16, null, 1, '2'),
('22','eae', 1, null, 2, '2'),
('23','tranquilo?', 3, null, 2, '2'),
('24','to suave', 1, null, 2, '2');

insert into tb_chat values 
('25','então ok', 6, null, 2, '2');



insert into tb_postagem (cd_postagem, nm_titulo, dt_postagem, hr_postagem, ds_imagem, qt_curtida, qt_descurtida, qt_comentario, qt_compartilhamento, qt_denuncia, cd_perfil) values 
(1, 'selfie na BGs', '2019-01-04', '8:55', 'assets/img/upload/postagem/link1.jpg', 1, 1, 1, 1,1, 1),
(2, 'Jogando Fortnite', '2019-01-20', '11:56', 'assets/img/upload/postagem/link2.jpg',1, 1, 1, 1,1, '15'),
(3, 'Partiu lolzinho', '2019-02-07', '12:56', 'assets/img/upload/postagem/link3.jpg',1, 1, 1, 1,1, '3'),
(4, 'Senhor dos aneis no final de semana', '2019-02-17', '17:55', 'assets/img/upload/postagem/link4.jpg',1, 1, 1, 1,1, '4'),
(5, 'Coringa no oscar', '2019-03-11', '9:03','assets/img/upload/postagem/link5.jpg',1, 1, 1, 1,1, '5'),
(6 , 'Thor vs Shazam', '2019-02-10', '10:30', 'assets/img/upload/postagem/link6.jpg',1, 1, 1, 1,1, '6'),
(7 , 'Marvel ou DC ?', '2019-04-15', '21:15', 'assets/img/upload/postagem/link7.jpg',1, 1, 1, 1,1, '7'),
(8 , 'Qual o melhor Robin ?', '2019-06-12', '20:33', 'assets/img/upload/postagem/link8.jpg', 1, 1, 1, 1,1,'1'),
(9 , 'Heath Ledger ou Joaquin Phoenix ?', '2019-07-29', '11:57', 'assets/img/upload/postagem/link9.jpg',1, 1, 1, 1,1, '1'),
(10, 'final de semana', '2019-02-17', '17:55', null,1, 1, 1, 1,1, '4'),
(11, 'oscar', '2019-03-11', '9:03', null,1, 1, 1, 1,1, '5'),
(12 , 'Fat Thor > Skinny Thor ', '2019-02-10', '10:30', 'assets/img/upload/postagem/link11.jpg',1, 1, 1, 1,1, '6'),
(13 , 'Marvel', '2019-04-15', '21:15', null,1, 1, 1, 1,1, '7'),
(14 ,'rafasssss', '2017-01-15', '21:15', null,1, 1, 1, 1,1, '7'),
(15 ,'mulekadas', '2019-04-12', '20:33', null,1, 1, 1, 1,1, '1'),
(16 ,'manucuriva', '2013-01-19', '11:57', null,1, 1, 1, 1,1, '7'),
(17 ,'gatasss', '2019-02-27', '15:44', null,1, 1, 1, 1,1, '14'),
(18, 'Jogo do One Punch-Man', '2019-08-27', '15:44', 'assets/img/upload/postagem/link10.jpg',1, 1, 1, 1,1, '11');



insert into tb_curtida values 
('1', '1'  ,  '1'),
('2', '3'  ,  '2'),
('3', '3'  ,  '3'),
('4', '4'  ,  '4' ),
('5', '5'  ,  '5'),
('6' , '6' ,  '6'),
('7' , '7' ,  '7'),
('8' , '8' ,  '8'),
('9' , '9' ,  '9'),
('10', '10', '10');

/*insert into tb_curtida (cd_curtida, cd_postagem, cd_perfil) values
('1', '6', '6' ),
('7', '7', '7' ),
('8', '8', '8' ),
('14', '9', '9' ),
('10', '10', '10'); */

insert into tb_compartilhamento values 
('13', '2019-04-25', '18:23',  '1',  '1'),
('15', '2019-07-29', '17:59', '2',  '2'),
('14', '2019-04-12', '00:14',  '3',  '3'),
('4', '2019-06-26', '14:10',  '4',  '4'),
('5', '2019-10-04', '23:09', '5',  '5'),
('6', '2019-04-11', '23:09',  '6',  '6'),
('7', '2019-07-08', '08:11',  '7',  '7'),
('8', '2019-01-20', '10:41',  '8',  '8'),
('11', '2019-03-19', '17:54', '9',  '9'),
('12', '2019-02-15','17:54',  '10', '10');

insert into tb_compartilhamento (cd_compartilhamento, dt_compartilhamento, hr_compartilhamento, cd_postagem, cd_perfil) values 
('3', '2017-03-19', '13:14', '9',  '9'),
('2', '2013-02-19', '11:54', '9',  '9'),
('1', '2014-01-19', '15:44', '9',  '9'),
('9', '2013-03-11', '14:14', '9',  '9'),
('19', '2014-01-23', '11:13','7',  '8');


insert into tb_comentario values 
('1', 'show', '2019-04-07', '19:03', '1', 1),
('2', 'gostei mto', '2019-04-21', '18:56', '2', 2),
('3', 'bora', '2019-06-09', '19:04',  '3', 3),
('4', 'boa sorte', '2019-07-16', '19:02', '4', 4),
('5', 'concordo', '2019-10-14', '19:01',  '5', 5),
('6' , 'bom', '2019-10-26', '02:39',  '6', 6),
('7' , 'não gostei', '2019-10-22', '20:07',  '7', 7),
('11' , 'chato', '2019-09-09', '20:03', '8', 8),
('12' , 'muito bom', '2019-03-22', '20:07',  '9', 9),
('10', 'bem loko', '2019-07-02', '02:39',  '10', 10);

insert into tb_comentario (cd_comentario,ds_comentario, dt_comentario, hr_comentario, cd_postagem, cd_perfil) values 
('8' ,'AFFS VAMOS', '2011-04-01', '20:00', '8', '8'),
('9' ,'CARAI FILHAO', '2011-03-25', '20:02', '9', '9'),
('13','AMIGASSS', '2013-07-12', '02:39', '10', '10');

/*
insert into tb_notificacao values
('1' , '3', '1', '1'),
('2' , '4', '2', '2'),
('3' , '5', '3', '3'),
('4' , '2', '4', '4'),
('5' , '1', '5', '5'),
('6' , '5', '6', '6'),
('7' , '1', '7', '7'),
('8' , '5', '3', '1'),
('9' , '6', '9', '1'),
('10', '7', '4', '1'); */

/*insert into tb_notificacao (cd_notificacao, cd_chat, cd_postagem) values
('11' , '1', '11'),
('13' , '2', '12'),
('15' , '2', '14'),
('12', '4', '13'); */

/*
insert into tb_notificacao(ic_status, cd_de, cd_para) values
('0', 18, 17),
('0', 19, 17),
('1',  4, 17); */


insert into tb_denuncia values 
('1', '2019-04-11','1', '4'),
('2', '2019-07-08','2', '5'),
('3', '2019-01-20','3', '4'),
('4', '2019-03-19','4', '3'),
('5', '2019-02-15','5', '2'),
('6' , '2019-02-25','6', '7'),
('14' , '2019-04-01','7', '2'),
('8' , '2019-05-11','8', '8'),
('9' , '2019-06-30','9', '7'),
('10', '2019-10-06','10', '8');

insert into tb_denuncia (cd_denuncia, dt_denuncia, cd_tipo_denuncia) values 
('11', '2019-02-15',3),
('13' , '2016-02-23',9),
('12' , '2014-02-09',2),
('16' , '2012-03-18',4),
('15' , '2014-05-30',5),
('17', '2016-10-06',7);



insert into grupo_perfil(cd_grupo, cd_perfil, ic_administrador) values
(1, 16, 0),
(1, 17, 1),
(2, 1,  1),
(2, 2,  0),
(2, 6,  0);

call tccNotificacao(17, '7');
call dtPostagem(17, '2019-06-12');
call tipoPostagem(17, '1');
call tipoDenuncia(17, 'Discurso de ódio');
call buscarMensagem('eae');
call buscarAmigo(17, 'Allyson');
call buscarGrupo(17, 'grupo de star wars');
call buscarPostagem(17, 'johnnyTest');





-- mostra qual a notificação foi recebida pelo tipo da notificação
delimiter $
create procedure tccNotificacao (
in cdPara int,
in cdTipoNotificacao int)
begin 
	select p.nm_nickname as nome, n.cd_tipo_notificacao, tp.nm_tipo_notificacao, po.nm_titulo, per.nm_nickname, per.ds_imagem
	from tb_perfil as p 
    left join tb_notificacao as n
	on p.cd_perfil = n.cd_de
    left join tb_perfil as per
    on per.cd_perfil = n.cd_para
    left join tb_tipo_notificacao as tp
	on tp.cd_tipo_notificacao = n.cd_tipo_notificacao
    left join tb_postagem as po
    on p.cd_perfil  = po.cd_perfil
    where n.cd_para = cdPara and tp.cd_tipo_notificacao = cdTipoNotificacao
	order by  p.nm_nickname;
end $

-- drop procedure tccNotificacao ;

-- mostra quem compartilhou pela data




-- mostra quem denunciou e em qual postagem
 

 
delimiter $
create procedure tipoDenuncia(
in cd int,
in tpDenuncia varchar(45))
begin 
	select p.nm_nickname, tp.nm_tipo_denuncia, po.nm_titulo, po.cd_postagem, po.ds_imagem,
    po.dt_postagem, po.cd_tipo_postagem, datediff(CURRENT_DATE(), po.dt_postagem)
    AS dias, hr_postagem as horas, po.hr_postagem,
    p.nm_nickname, p.cd_perfil as cdPerfil, p.ds_imagem as imgPerfil
	from tb_perfil as p join tb_postagem as po
	on p.cd_perfil = po.cd_perfil
    join tb_denuncia as d
	on d.cd_postagem = po.cd_postagem
    join tb_tipo_denuncia as tp
    on tp.cd_tipo_denuncia = d.cd_tipo_denuncia
	where tp.nm_tipo_denuncia = tpDenuncia and po.cd_perfil = cd
    order by  nm_nickname;
end $
-- drop procedure tipoDenuncia ;

-- Seleciona a mesagem que foi enviada no parametro
delimiter $
create procedure buscarMensagem(
in mensagem varchar(50))
begin 
	SELECT  c.ds_mensagem,c.cd_chat
    from tb_chat as c
    where c.cd_tipo_chat = 3 and c.ds_mensagem = mensagem
    order by cd_chat asc;
end $

-- drop procedure buscarMensagem;

delimiter $
create procedure buscarAmigo(
in cdPerfil int,
in nomeAmigo varchar(50))
begin 
SELECT per1.nm_nickname, per1.cd_perfil, per1.ds_imagem
from tb_perfil as per1
inner join tb_amigo as a
on per1.cd_perfil = a.cd_de
where a.cd_para = cdPerfil and per1.nm_nickname = nomeAmigo
union all
SELECT per2.nm_nickname, per2.cd_perfil, per2.ds_imagem
from tb_perfil as per2
inner join tb_amigo as a
on per2.cd_perfil = a.cd_para
where a.cd_de = cdPerfil and per2.nm_nickname = nomeAmigo
order by nm_nickname;
end $
-- Buscar o amigo pelo nome digitado 
-- drop procedure buscarAmigo;

delimiter $
create procedure buscarGrupo(
in cdPerfil int,
in nomeGrupo varchar(50))
begin 
SELECT g.nm_grupo, g.ds_imagem, g.cd_grupo
    from tb_grupo as g
    inner join grupo_perfil as gp
    on g.cd_grupo = gp.cd_grupo
    inner join tb_perfil as p
    on gp.cd_perfil = p.cd_perfil
    where p.cd_perfil = 17 and g.nm_grupo = nomeGrupo;
end $
-- busca grupo pelo nome digitado
-- drop procedure buscarGrupo;

delimiter $
create procedure buscarPostagem(
in cd int,
in nomeAmigo varchar(50))
begin 
     SELECT  pg.cd_postagem, pg.nm_titulo, pg.ds_imagem, datediff(CURRENT_DATE(), pg.dt_postagem)
    AS dias, hr_postagem as horas, pg.hr_postagem, p.nm_nickname, p.cd_perfil as cdPerfil, p.ds_imagem as imgPerfil,
             (select count(cd_curtida)  from tb_curtida
                 where pg.cd_postagem = tb_curtida.cd_postagem ) as qtdLike,
             (select count(cd_descurtida)  from tb_descurtida
                 where pg.cd_postagem = tb_descurtida.cd_postagem ) as qtdDeslike,
             (select count(cd_comentario)  from tb_comentario
                   where pg.cd_postagem = tb_comentario.cd_postagem ) as qtdComentario,
                 (SELECT nm_nickname  FROM tb_perfil WHERE cd_perfil = c.cd_perfil) as NicknameCompartilhou,
                    c.cd_compartilhamento, datediff(CURRENT_DATE(), c.dt_compartilhamento) AS diasC,
                    c.hr_compartilhamento as horasC , c.cd_postagem as IDPostagemCompartilhado, c.cd_perfil as cdCompartilhou,
                    pg.cd_tipo_postagem, pg.dt_postagem , c.dt_compartilhamento
         FROM tb_postagem pg
         right join 
             (SELECT per1.nm_nickname, per1.cd_perfil
		from tb_perfil as per1
		inner join tb_amigo as a
		on per1.cd_perfil = a.cd_de
		where (a.cd_para = cd or a.cd_de = cd)
		union 
		SELECT per2.nm_nickname, per2.cd_perfil
		from tb_perfil as per2
		inner join tb_amigo as a
		on per2.cd_perfil = a.cd_para
		where (a.cd_de = cd or a.cd_para = cd) 
		order by nm_nickname)  as a
        on a.cd_perfil = pg.cd_perfil
         left JOIN tb_perfil as p
         on p.cd_perfil = pg.cd_perfil
         LEFT JOIN tb_compartilhamento as c
         on pg.cd_postagem = c.cd_postagem
         where a.nm_nickname = nomeAmigo and pg.cd_postagem is not null
		ORDER BY dias ASC, horas DESC;
end $

-- Busca as postagens que o amigo fez

-- drop procedure buscarPostagem;
-- mostra quem postou pelo tipo de postagem
delimiter $
create procedure tipoPostagem (
in cd int,
in tipoPostagem int)
begin 
	SELECT  pg.cd_postagem, pg.nm_titulo, pg.ds_imagem, datediff(CURRENT_DATE(), pg.dt_postagem)
    AS dias, hr_postagem as horas, pg.hr_postagem, p.nm_nickname, p.cd_perfil as cdPerfil, p.ds_imagem as imgPerfil,
             (select count(cd_curtida)  from tb_curtida
                 where pg.cd_postagem = tb_curtida.cd_postagem ) as qtdLike,
             (select count(cd_descurtida)  from tb_descurtida
                 where pg.cd_postagem = tb_descurtida.cd_postagem ) as qtdDeslike,
             (select count(cd_comentario)  from tb_comentario
                   where pg.cd_postagem = tb_comentario.cd_postagem ) as qtdComentario,
                 (SELECT nm_nickname  FROM tb_perfil WHERE cd_perfil = c.cd_perfil) as NicknameCompartilhou,
                    c.cd_compartilhamento, datediff(CURRENT_DATE(), c.dt_compartilhamento) AS diasC,
                    c.hr_compartilhamento as horasC , c.cd_postagem as IDPostagemCompartilhado, c.cd_perfil as cdCompartilhou,
                    pg.cd_tipo_postagem, pg.dt_postagem , c.dt_compartilhamento
         FROM tb_postagem pg
         right join 
             (SELECT per1.nm_nickname, per1.cd_perfil
		from tb_perfil as per1
		inner join tb_amigo as a
		on per1.cd_perfil = a.cd_de
		where (a.cd_para = cd or a.cd_de = cd)
		union 
		SELECT per2.nm_nickname, per2.cd_perfil
		from tb_perfil as per2
		inner join tb_amigo as a
		on per2.cd_perfil = a.cd_para
		where (a.cd_de = cd or a.cd_para = cd) 
		order by nm_nickname)  as a
        on a.cd_perfil = pg.cd_perfil
         left JOIN tb_perfil as p
         on p.cd_perfil = pg.cd_perfil
         LEFT JOIN tb_compartilhamento as c
         on pg.cd_postagem = c.cd_postagem
		 where pg.cd_tipo_postagem = tipoPostagem
		ORDER BY dias ASC, horas DESC;
    
end $

-- drop procedure tipoPostagem ;

delimiter $
create procedure dtPostagem(
in cd int,
in dataPostagem date)
begin 
     SELECT  pg.cd_postagem, pg.nm_titulo, pg.ds_imagem, datediff(CURRENT_DATE(), pg.dt_postagem)
    AS dias, hr_postagem as horas, pg.hr_postagem, p.nm_nickname, p.cd_perfil as cdPerfil, p.ds_imagem as imgPerfil,
             (select count(cd_curtida)  from tb_curtida
                 where pg.cd_postagem = tb_curtida.cd_postagem ) as qtdLike,
             (select count(cd_descurtida)  from tb_descurtida
                 where pg.cd_postagem = tb_descurtida.cd_postagem ) as qtdDeslike,
             (select count(cd_comentario)  from tb_comentario
                   where pg.cd_postagem = tb_comentario.cd_postagem ) as qtdComentario,
                 (SELECT nm_nickname  FROM tb_perfil WHERE cd_perfil = c.cd_perfil) as NicknameCompartilhou,
                    c.cd_compartilhamento, datediff(CURRENT_DATE(), c.dt_compartilhamento) AS diasC,
                    c.hr_compartilhamento as horasC , c.cd_postagem as IDPostagemCompartilhado, c.cd_perfil as cdCompartilhou,
                    pg.cd_tipo_postagem, pg.dt_postagem , c.dt_compartilhamento
         FROM tb_postagem pg
         right join 
             (SELECT per1.nm_nickname, per1.cd_perfil
		from tb_perfil as per1
		inner join tb_amigo as a
		on per1.cd_perfil = a.cd_de
		where (a.cd_para = cd or a.cd_de = cd)
		union 
		SELECT per2.nm_nickname, per2.cd_perfil
		from tb_perfil as per2
		inner join tb_amigo as a
		on per2.cd_perfil = a.cd_para
		where (a.cd_de = cd or a.cd_para = cd) 
		order by nm_nickname)  as a
        on a.cd_perfil = pg.cd_perfil
         left JOIN tb_perfil as p
         on p.cd_perfil = pg.cd_perfil
         LEFT JOIN tb_compartilhamento as c
         on pg.cd_postagem = c.cd_postagem
         where pg.dt_postagem = dataPostagem and pg.cd_postagem is not null
		ORDER BY dias ASC, horas DESC;
end $

-- drop procedure dtPostagem ;