import { parse, formatISO, parseISO, format } from "date-fns";
import es from "date-fns/locale/es";

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

export const displayFormatDate = (date) => {
	const newDate = parseISO(date);
	const formatDate = format(newDate, "PPPP", { locale: es });
	return formatDate;
};
