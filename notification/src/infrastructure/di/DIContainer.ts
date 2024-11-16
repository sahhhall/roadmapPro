

export class DIContainer {
    private static instance: DIContainer;
    private constructor() {
    }

    public static getInstance(): DIContainer {
        if (!DIContainer.instance) {
            DIContainer.instance = new DIContainer()
        }
        return DIContainer.instance;
    };


}