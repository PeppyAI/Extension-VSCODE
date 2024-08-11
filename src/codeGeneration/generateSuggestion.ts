export async function makeSuggestion() {
    // This request needs to be rerouted to appropriate channel
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Time over for 5 sec");
            resolve("Dummy Text");
        }, 5000);
    });
}