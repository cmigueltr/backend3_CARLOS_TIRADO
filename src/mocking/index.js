import mongoose from 'mongoose';
import { createHash } from '../utils/index.js';

const PET_NAMES = ['Firulais', 'Manchas', 'Luna', 'Max', 'Toby', 'Bella', 'Rocky', 'Coco', 'Lola', 'Simba', 'Nala', 'Thor', 'Zeus', 'Mia', 'Charlie', 'Duke', 'Milo', 'Oreo', 'Pepper', 'Rex'];
const PET_SPECIES = ['Perro', 'Gato', 'Conejo', 'Hamster', 'Pájaro', 'Tortuga', 'Pez'];
const FIRST_NAMES = ['Carlos', 'María', 'Juan', 'Ana', 'Pedro', 'Laura', 'Diego', 'Sofía', 'Miguel', 'Valentina', 'Luis', 'Isabella', 'José', 'Emma', 'Fernando', 'Lucía'];
const LAST_NAMES = ['García', 'Rodríguez', 'Martínez', 'López', 'González', 'Hernández', 'Pérez', 'Sánchez', 'Ramírez', 'Torres', 'Flores', 'Rivera', 'Gómez', 'Díaz', 'Castro', 'Romero'];

/**
 * Genera usuarios mock según el parámetro numérico indicado.
 * Formato compatible con respuesta de MongoDB.
 * @param {number} count - Cantidad de usuarios a generar
 * @returns {Promise<Array>} Array de usuarios con formato Mongo
 */
export const generateMockUsers = async (count) => {
    const hashedPassword = await createHash('coder123');
    const users = [];
    const usedEmails = new Set();

    for (let i = 0; i < count; i++) {
        let email;
        do {
            const name = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
            const num = Math.floor(Math.random() * 9999) + 1;
            email = `${name.toLowerCase()}.${num}@coder.com`;
        } while (usedEmails.has(email));
        usedEmails.add(email);

        const role = Math.random() > 0.5 ? 'admin' : 'user';
        const first_name = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
        const last_name = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];

        users.push({
            _id: new mongoose.Types.ObjectId(),
            first_name,
            last_name,
            email,
            password: hashedPassword,
            role,
            pets: [],
            __v: 0
        });
    }

    return users;
};

/**
 * Genera pets mock según el parámetro numérico indicado.
 * Formato compatible con respuesta de MongoDB.
 * @param {number} count - Cantidad de pets a generar
 * @returns {Array} Array de pets con formato Mongo
 */
export const generateMockPets = (count) => {
    const pets = [];

    for (let i = 0; i < count; i++) {
        const name = PET_NAMES[Math.floor(Math.random() * PET_NAMES.length)];
        const specie = PET_SPECIES[Math.floor(Math.random() * PET_SPECIES.length)];
        const year = 2018 + Math.floor(Math.random() * 6);
        const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
        const day = String(Math.floor(Math.random() * 28) + 1).padStart(2, '0');
        const birthDate = new Date(`${year}-${month}-${day}`);

        pets.push({
            _id: new mongoose.Types.ObjectId(),
            name,
            specie,
            birthDate,
            adopted: false,
            owner: null,
            image: null,
            __v: 0
        });
    }

    return pets;
};

/**
 * Genera usuarios para insertar en la base de datos.
 * @param {number} count - Cantidad de usuarios a generar
 * @returns {Promise<Array>} Array de objetos usuario para create()
 */
export const generateUsersForInsert = async (count) => {
    const hashedPassword = await createHash('coder123');
    const users = [];
    const usedEmails = new Set();

    for (let i = 0; i < count; i++) {
        let email;
        do {
            const name = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
            const num = Math.floor(Math.random() * 9999) + 1;
            email = `${name.toLowerCase()}.${num}@coder.com`;
        } while (usedEmails.has(email));
        usedEmails.add(email);

        const role = Math.random() > 0.5 ? 'admin' : 'user';
        const first_name = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
        const last_name = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];

        users.push({
            first_name,
            last_name,
            email,
            password: hashedPassword,
            role,
            pets: []
        });
    }

    return users;
};

/**
 * Genera pets para insertar en la base de datos.
 * @param {number} count - Cantidad de pets a generar
 * @returns {Array} Array de objetos pet para create()
 */
export const generatePetsForInsert = (count) => {
    const pets = [];

    for (let i = 0; i < count; i++) {
        const name = PET_NAMES[Math.floor(Math.random() * PET_NAMES.length)];
        const specie = PET_SPECIES[Math.floor(Math.random() * PET_SPECIES.length)];
        const year = 2018 + Math.floor(Math.random() * 6);
        const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
        const day = String(Math.floor(Math.random() * 28) + 1).padStart(2, '0');
        const birthDate = new Date(`${year}-${month}-${day}`);

        pets.push({
            name,
            specie,
            birthDate,
            adopted: false
        });
    }

    return pets;
};
