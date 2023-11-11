export default {
    isOwner(id: string): boolean {
        return id === process.env.OWNER_ID;
    },
};
