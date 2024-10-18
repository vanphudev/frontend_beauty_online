function formatCurrency(value) {
   const numberValue = Number(value);

   if (isNaN(numberValue)) {
      throw new Error("Input must be a number");
   }

   const formattedValue = numberValue.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".");

   return `${formattedValue} VNĐ`;
}

export default formatCurrency;
