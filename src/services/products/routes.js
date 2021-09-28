import {Router} from "express"
import { pool } from "../../utilities/database.js"
const productsRoute = Router()

productsRoute.get("/", async(req, res, next)=> {
    try {
        const query = `SELECT * FROM products;`
        const result = await pool.query(query)
        //console.log(result)
        res.send(result.rows)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

productsRoute.get("/:productId", async(req, res, next)=> {
    try {
        const query = `SELECT * FROM products WHERE product_id = ${req.params.productId}`
        const result = await pool.query(query)

        if(result.rows.length > 0){
            res.send(result.rows[0])

        } else{
            res.status(404).send({message: `No product with id ${req.params.productId}`})
        }
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
        
    }
})

productsRoute.post("/", async(req, res, next)=> {
    try {
        const {product_name, description, brand, image_url, price, category } = req.body;
        const query =`
        INSERT INTO products
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
        console.log(error)
        res.status(500).send(error)
    }
})

productsRoute.put("/:productId", async(req, res, next)=> {
    try {

        const {product_name, description, brand, image_url, price, category } = req.body;
        const query = `
            UPDATE products SET
                product_name = ${"'"+product_name+"'"}, 
                description = ${"'"+description+"'"}, 
                brand = ${"'"+brand+"'"}, 
                image_url = ${"'"+image_url+"'"}, 
                price = ${"'"+price+"'"}, 
                category = ${"'"+category+"'"},
                updated_at = NOW()
            WHERE product_id = ${req.params.productId}
            RETURNING *;
        `
        const result = await pool.query(query)
        res.send(result.rows[0])
        
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
        
    }
})

productsRoute.delete("/:productId", async(req, res, next)=> {
    try {
        const query = `DELETE FROM products WHERE product_id = ${req.params.productId};`
        await pool.query(query)
        res.status(204).send()

    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
    
})

export default productsRoute