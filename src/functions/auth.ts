
// This is just here to make the transition a lot easier from localStorage to nextjs auth potentially;

export default function useSession() {
    const fetchedThing: string | null = sessionStorage.getItem("user");

    if (fetchedThing !== null) {
        return JSON.parse(fetchedThing);
    } else {
        return null;
    }
}