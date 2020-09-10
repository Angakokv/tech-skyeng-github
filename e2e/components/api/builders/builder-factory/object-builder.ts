import {BuilderType} from "./builder.type";

export function ObjectBuilder<T>(): BuilderType<T> {
    const built: any = {};
    const builder = new Proxy(
        {},
        {
            get(target, prop, receiver) {
                // (target && receiver) === '' is un necessary but to avoid the unused var error, we need to do this
                if ("build" === prop || (target && receiver) === "") {
                    return () => built;
                }

                return (x: any): any => {
                    built[prop] = x;
                    return builder;
                };
            }
        }
    );

    return builder as any;
}
