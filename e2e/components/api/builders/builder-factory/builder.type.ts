export type BuilderType<T> = {
        [k in keyof T]: (arg: T[k]) => BuilderType<T>
    }
    & {
    build(): T
};
