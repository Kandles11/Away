const express = require('express');
const baggageController = require('../../controllers/baggage.controller');

const router = express.Router();

router.route('/').post(baggageController.createBaggage);
router.route('/').patch(baggageController.updateBaggage);
router.route('/').get(baggageController.getBaggage);
router.route('/user/:user').get(baggageController.getBaggagesByUser);
router.route('/').delete(baggageController.deleteBaggage);

/**
 * @swagger
 * tags:
 *   name: Baggage
 *   description: baggage management
 */

/**
 * @swagger
 * tags:
 *   name: Baggage
 *   description: Baggage management
 */

/**
 * @swagger
 * /baggage:
 *   post:
 *     summary: Create a new baggage
 *     tags: [Baggage]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user
 *               - tagData
 *             properties:
 *               user:
 *                 type: string
 *               tagData:
 *                 type: string
 *             example:
 *               user: userId
 *               tagData: tag123
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Baggage'
 *       "400":
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /baggage:
 *   patch:
 *     summary: Update baggage information
 *     tags: [Baggage]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - tagData
 *             properties:
 *               tagData:
 *                 type: string
 *               claimed:
 *                 type: boolean
 *             example:
 *               tagData: tag123
 *               claimed: true
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Baggage'
 *       "400":
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /baggage:
 *   get:
 *     summary: Get baggage information
 *     tags: [Baggage]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - tagData
 *             properties:
 *               tagData:
 *                 type: string
 *             example:
 *               tagData: tag123
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Baggage'
 *       "400":
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /baggage/user/{user}:
 *   get:
 *     summary: Get baggage by user ID
 *     tags: [Baggage]
 *     parameters:
 *       - in: path
 *         name: user
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       "200":
 *         description: An array of baggage objects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Baggage'
 *       "400":
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       "404":
 *         description: No baggage found for the user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /baggage:
 *   delete:
 *     summary: Delete baggage information
 *     tags: [Baggage]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - tagData
 *             properties:
 *               tagData:
 *                 type: string
 *             example:
 *               tagData: tag123
 *     responses:
 *       "200":
 *         description: Baggage deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Baggage deleted successfully
 *       "400":
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       "404":
 *         description: Baggage not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
module.exports = router;
