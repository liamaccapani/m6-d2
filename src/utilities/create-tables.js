import { pool } from "./database.js";

const query = `
    --DROP TABLE IF EXISTS products;
    CREATE TABLE IF NOT EXISTS 
        products(
            product_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
            product_name VARCHAR (50) NOT NULL,
            description VARCHAR (100) NOT NULL,
            brand VARCHAR (50) NOT NULL,
            image_url TEXT,
            price FLOAT NOT NULL,
            category TEXT NOT NULL,
            created_at TIMESTAMPTZ DEFAULT NOW(),
            updated_at TIMESTAMPTZ DEFAULT NOW()
        );
`

const createTables = async () => {
    try {
        await pool.query(query)
        console.log('Default tables are created ✅')
    } catch (error) {
        console.log('Default tables are not created ❌')
    }
}

export default createTables