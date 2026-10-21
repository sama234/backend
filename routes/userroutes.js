const express=require("express")
const multer=require("multer")
const { createuser, loginuser, phoneuser, getall, getbyid, deleteuser, upadteuser, loginwithotp, verifyotp, uploadavatar } = require("../controller/usercontroler")
const router=express.Router()


/**
 * @swagger
 * /api/createuser:
 *   post:
 *     summary: Register a new user
 *     description: Creates a new user account after checking whether the email already exists and hashing the password.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - phone
 *               - country
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               
 *               email:
 *                 type: string
 *                 example: rahul@gmail.com
 *               phone:
 *                 type: number
 *                 example: 9876543210
 *               country:
 *                 type: string
 *                 example: India
 *               password:
 *                 type: string
 *                 format: password
 *                 example: Rahul@123
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Email already exists
 *       500:
 *         description: Internal server error
 */


router.post("/createuser",createuser)

router.post("/loginwithemail",loginuser)
router.post("/loginwithnumber",phoneuser)


/**
 * @swagger
 * /api/getall:
 *   get:
 *     summary: Get all users
 *     description: Retrieves a list of all users.
 *     tags:
 *       - Users
 *     responses:
 *       201:
 *         description: Data fetched successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.get("/getall",getall)
router.get("/getbyid/:id",getbyid)



/**
 * @swagger
 * /api/deleteuser/{id}:
 *   delete:
 *     summary: Delete a user
 *     description: Deletes a user account using the provided user ID.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to delete
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       400:
 *         description: Invalid user ID
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */



router.delete("/deleteuser/:id",deleteuser)



/**
 * @swagger
 * /api/updateuser/{id}:
 *   put:
 *     summary: Update a user
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               country:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Invalid user ID or data
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */


router.put("/updateuser/:id",upadteuser)

router.post("/loginwithotp",loginwithotp)

router.post("/verifyotp",verifyotp)

/**
 * @swagger
 * /api/uploadimage:
 *   post:
 *     summary: Upload an image
 *     description: Uploads an image to the uploads folder.
 *     tags:
 *       - Images
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - image
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Select an image to upload
 *     responses:
 *       200:
 *         description: Image uploaded successfully
 *       400:
 *         description: Image upload failed
 *       500:
 *         description: Internal server error
 */

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"uploads/")
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+"-"+file.originalname)
    }
})
const upload=multer({storage:storage})


router.post("/uploadimage/:id",upload.single("image"),uploadavatar)



module.exports=router