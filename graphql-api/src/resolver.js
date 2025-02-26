import { faker } from "@faker-js/faker";
import { teams } from "./data.js";
import { getRandomNumber } from "./helper/numberGenerator.js";

// Mock resolvers (generate data dynamically)
export const resolvers = {
	Query: {
		games: () =>
			[...Array(4)].map(() => {
				const firstRandomNumber = getRandomNumber();
				const secondRandomNumber = getRandomNumber();

				return {
					id: faker.string.uuid(),
					team1: {
						name: teams[firstRandomNumber].name,
						logo: teams[firstRandomNumber].logo,
					},
					team2: {
						name: teams[secondRandomNumber].name,
						logo: teams[secondRandomNumber].logo,
					},
					moneyline1: Number(`-${faker.number.int({ min: 50, max: 300 })}`),
					moneyline2: faker.number.int({ min: 50, max: 300 }),
					spread1: Number(
						`-${faker.number.float({ min: 1, max: 10 }).toFixed(2)}`
					),
					spread2: faker.number.float({ min: 1, max: 10 }).toFixed(2),
					totalOver: faker.number.float({ min: 1, max: 30 }).toFixed(2),
					totalUnder: faker.number.float({ min: 1, max: 30 }).toFixed(2),
					endTime: faker.date.soon(),
				};
			}),
	},
};
