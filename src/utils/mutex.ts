export class Mutex {
    private current: Promise<void> = Promise.resolve();
    private locked = false;

    isLocked(): boolean {
        return this.locked;
    }

    async waitForUnlock(): Promise<void> {
        await this.current;
    }

    async acquire(): Promise<() => void> {
        let release!: () => void;
        const previous = this.current;
        let released = false;

        this.current = (async () => {
            await previous;
            this.locked = true;
            await new Promise<void>((resolve) => {
                release = () => resolve();
            });
            this.locked = false;
        })();

        return () => {
            if (!released) {
                released = true;
                release();
            }
        };
    }
}
