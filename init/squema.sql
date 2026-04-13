DROP TABLE IF EXISTS appointments CASCADE;
DROP TABLE IF EXISTS services CASCADE;
DROP TYPE IF EXISTS appointment_status CASCADE;


CREATE TYPE appointment_status AS ENUM (
    'PENDING',
    'DONE',
    'CANCELLED'
);


CREATE TABLE services (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    duration_minutes INTEGER NOT NULL CHECK (duration_minutes > 0),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE appointments (
    id BIGSERIAL PRIMARY KEY, 
    client_name VARCHAR(100) NOT NULL,
    client_email VARCHAR(150) NOT NULL,
    date DATE NOT NULL,
    time TIME NOT NULL,
    status appointment_status NOT NULL DEFAULT 'PENDING',
    service_id BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_service
        FOREIGN KEY (service_id)
        REFERENCES services(id)
        ON DELETE RESTRICT,

    --Validación básica email
    CONSTRAINT email_format_check
        CHECK (client_email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);


-- INDEXES (performance)
CREATE INDEX idx_appointments_status ON appointments(status);
CREATE INDEX idx_appointments_date ON appointments(date);
CREATE INDEX idx_appointments_service_id ON appointments(service_id);


-- SEED DATA
INSERT INTO services (name, description, duration_minutes) VALUES
('Corte de cabello', 'Servicio de corte básico', 30),
('Asesoría académica', 'Orientación en temas educativos', 60),
('Consulta técnica', 'Soporte técnico especializado', 45),
('Tutoría', 'Clases personalizadas', 90);