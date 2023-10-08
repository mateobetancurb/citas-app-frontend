import { parse, formatISO } from "date-fns";

export const formatCurrency = (price) => {
	return Number(price).toLocaleString("en-US", {
		style: "currency",
		currency: "USD",
	});
};

export const formatName = (name) => {
	const [firstName] = name.split(" ");
	return firstName.charAt(0).toUpperCase() + firstName.slice(1);
};

export const formatDateISO = (date) => {
	const newDate = parse(date, "dd/MM/yyyy", new Date());
	return formatISO(newDate);
};
