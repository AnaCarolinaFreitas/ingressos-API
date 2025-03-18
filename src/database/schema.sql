CREATE DATABASE evento;

\c evento;

CREATE TABLE ingressos(
    id SERIAL PRIMARY KEY,
    evento VARCHAR(255) NOT NULL,
    local_evento VARCHAR(255) NOT NULL,
    data_evento DATE NOT NULL,
    categoria VARCHAR(50) NOT NULL,
    preco DECIMAL(10,2) NOT NULL,
    quantidade_disponivel INTEGER NOT NULL
    );

    INSERT INTO ingressos (evento, local_evento, data_evento, categoria, preco, quantidade_disponivel) VALUES
    ('Short n Sweet', 'Allianz Parque', '2025-10-25', 'VIP', 700.00, 10000),
    ('Short n Sweet', 'Allianz Parque', '2025-10-25', 'Pista', 500.00, 10000),
    ('Short n Sweet', 'Allianz Parque', '2025-10-25', 'Camarote', 800.00, 3000),
    ('Short n Sweet', 'Allianz Parque', '2025-10-25', 'Arquibancada', 300.00, 20000);
