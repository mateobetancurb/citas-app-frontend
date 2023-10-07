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
