/*==============================================================*/
/* Nom de SGBD :  Sybase SQL Anywhere 11                        */
/* Date de création :  22/08/2023 07:47:31                      */
/*==============================================================*/


/*==============================================================*/
/* Table : DATAOVERVIEW                                         */
/*==============================================================*/
create table if not exists DATAOVERVIEW 
(
   DO_ID                integer                        not null,
   USER_ID              integer                        null,
   SCRAPED_WEBSITE      varchar(20)                    null,
   START_DATE           date                           null,
   EXEC_TIME            time                           null,
   RESULTS              varchar(20)                    null,
   constraint PK_DATAOVERVIEW primary key clustered (DO_ID)
);

/*==============================================================*/
/* Table : "USER"                                               */
/*==============================================================*/
create table if not exists USER
(
   USER_ID              integer                        not null,
   NOM                  varchar(255)                   null,
   PRENOM               varchar(255)                    null,
   EMAIL                varchar(255)                   null,
   MOTDEPASSE           varchar(255)                   null,
   AVATAR               varchar(50)                    null,
   ROLE                 varchar(10)                    null,
   PAYS                 varchar(50)                    null,
   constraint PK_USER primary key clustered (USER_ID)
);

alter table DATAOVERVIEW
   add constraint FK_DATAOVER_REFERENCE_USER foreign key (USER_ID)
      references USER (USER_ID)
      on update restrict
      on delete restrict;

