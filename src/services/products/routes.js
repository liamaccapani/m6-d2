import {Router} from "express"
import pool from "../../utils/db.js"
const productsRoute = Router()

productsRoute.get("/", async(req, res, next)=> {
    try {
        const query = `SELECT * FROM products;`
        const result = await pool.query(query)
        //console.log(result)
        res.send(result.rows)
    } catch (error) {
        res.status(500).send(error)
    }
})

productsRoute.post("/", async(req, res, next)=> {
    try {
        const {product_name, description, brand, image_url, price, category } = req.body;
        const query =`
        INSERT INTO authors
        (
            product_name, 
            description, 
            brand, 
            image_url, 
            price, 
            category
        )
        VALUES 
        (
            ${"'"+product_name+"'"},
            ${"'"+description+"'"},
            ${"'"+brand+"'"},
            ${"'"+image_url+"'"},
            ${"'"+price+"'"},
            ${"'"+category+"'"}
        ) RETURNING *;
        `
        const result = await pool.query(query)
        res.status(201).send(result.rows[0])
    } catch (error) {
        res.status(500).send(error)
    }
})