BEGIN;

INSERT INTO "list" ("name", "position")
VALUES  ('Liste de courses', 1),
        ('Liste au père Noël', 0);

INSERT INTO "card" ("title", "position", "color", "list_id")
VALUES  ('Patates douces', 0, '#e28743', 1),
        ('Chocolat', 1, '#abdbe3', 1),
        ('un pyjama', 0, '#e3abdb', 2),
        ('un poste de dev', 1, '#f0f', 2),
        ('une super Nintendo', 2, '#bfe3ab', 2),
        ('une orange', 3, '#F57c24', 2);

INSERT INTO "tag" ("name", "color")
VALUES  ('Urgent', '#F00'),
        ('En retard', '#0F0'),
        ('Meilleur cadeau', '#F0F');

INSERT INTO "card_has_tag" ("card_id", "tag_id")
VALUES  (3, 1),
        (1, 2),
        (1, 3);

COMMIT;
