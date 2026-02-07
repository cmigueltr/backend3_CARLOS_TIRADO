import { generateMockUsers, generateMockPets, generateUsersForInsert, generatePetsForInsert } from '../mocking/index.js';
import { usersService, petsService } from '../services/index.js';

/**
 * GET /mockingpets - Genera pets mock en formato Mongo (sin guardar en DB)
 */
const getMockingPets = async (req, res) => {
    try {
        const count = parseInt(req.query.count) || 50;
        const pets = generateMockPets(count);
        res.send({ status: 'success', payload: pets });
    } catch (error) {
        res.status(500).send({ status: 'error', error: error.message });
    }
};

/**
 * GET /mockingusers - Genera 50 usuarios mock en formato Mongo (sin guardar en DB)
 */
const getMockingUsers = async (req, res) => {
    try {
        const users = await generateMockUsers(50);
        res.send({ status: 'success', payload: users });
    } catch (error) {
        res.status(500).send({ status: 'error', error: error.message });
    }
};

/**
 * POST /generateData - Genera e inserta usuarios y pets en la base de datos
 * Body: { users: number, pets: number }
 */
const generateData = async (req, res) => {
    try {
        const { users: usersCount = 0, pets: petsCount = 0 } = req.body;

        const usersToInsert = Math.max(0, parseInt(usersCount) || 0);
        const petsToInsert = Math.max(0, parseInt(petsCount) || 0);

        if (usersToInsert === 0 && petsToInsert === 0) {
            return res.status(400).send({
                status: 'error',
                error: 'Debe indicar al menos users o pets mayor a 0'
            });
        }

        const insertedUsers = [];
        const insertedPets = [];

        if (usersToInsert > 0) {
            const users = await generateUsersForInsert(usersToInsert);
            for (const user of users) {
                try {
                    const created = await usersService.create(user);
                    insertedUsers.push(created);
                } catch (err) {
                    if (err.code === 11000) {
                        continue;
                    }
                    throw err;
                }
            }
        }

        if (petsToInsert > 0) {
            const pets = generatePetsForInsert(petsToInsert);
            for (const pet of pets) {
                const created = await petsService.create(pet);
                insertedPets.push(created);
            }
        }

        res.send({
            status: 'success',
            payload: {
                users: { inserted: insertedUsers.length, data: insertedUsers },
                pets: { inserted: insertedPets.length, data: insertedPets }
            },
            message: `Se insertaron ${insertedUsers.length} usuarios y ${insertedPets.length} pets. Comprueba con GET /api/users y GET /api/pets`
        });
    } catch (error) {
        res.status(500).send({ status: 'error', error: error.message });
    }
};

export default {
    getMockingPets,
    getMockingUsers,
    generateData
};
