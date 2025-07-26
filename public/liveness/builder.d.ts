declare type Primitive = string | number | symbol | bigint | boolean | null | undefined;

declare namespace util {
    type AssertEqual<T, U> = (<V>() => V extends T ? 1 : 2) extends <V>() => V extends U ? 1 : 2 ? true : false;
    export type isAny<T> = 0 extends 1 & T ? true : false;
    export const assertEqual: <A, B>(val: AssertEqual<A, B>) => AssertEqual<A, B>;
    export function assertIs<T>(_arg: T): void;
    export function assertNever(_x: never): never;
    export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
    export type OmitKeys<T, K extends string> = Pick<T, Exclude<keyof T, K>>;
    export type MakePartial<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
    export type Exactly<T, X> = T & Record<Exclude<keyof X, keyof T>, never>;
    export const arrayToEnum: <T extends string, U extends [T, ...T[]]>(items: U) => { [k in U[number]]: k; };
    export const getValidEnumValues: (obj: any) => any[];
    export const objectValues: (obj: any) => any[];
    export const objectKeys: ObjectConstructor["keys"];
    export const find: <T>(arr: T[], checker: (arg: T) => any) => T | undefined;
    export type identity<T> = objectUtil.identity<T>;
    export type flatten<T> = objectUtil.flatten<T>;
    export type noUndefined<T> = T extends undefined ? never : T;
    export const isInteger: NumberConstructor["isInteger"];
    export function joinValues<T extends any[]>(array: T, separator?: string): string;
    export const jsonStringifyReplacer: (_: string, value: any) => any;
    export {};
}
declare namespace objectUtil {
    export type MergeShapes<U, V> = {
        [k in Exclude<keyof U, keyof V>]: U[k];
    } & V;
    type optionalKeys<T extends object> = {
        [k in keyof T]: undefined extends T[k] ? k : never;
    }[keyof T];
    type requiredKeys<T extends object> = {
        [k in keyof T]: undefined extends T[k] ? never : k;
    }[keyof T];
    export type addQuestionMarks<T extends object, _O = any> = {
        [K in requiredKeys<T>]: T[K];
    } & {
        [K in optionalKeys<T>]?: T[K];
    } & {
        [k in keyof T]?: unknown;
    };
    export type identity<T> = T;
    export type flatten<T> = identity<{
        [k in keyof T]: T[k];
    }>;
    export type noNeverKeys<T> = {
        [k in keyof T]: [T[k]] extends [never] ? never : k;
    }[keyof T];
    export type noNever<T> = identity<{
        [k in noNeverKeys<T>]: k extends keyof T ? T[k] : never;
    }>;
    export const mergeShapes: <U, T>(first: U, second: T) => T & U;
    export type extendShape<A extends object, B extends object> = {
        [K in keyof A as K extends keyof B ? never : K]: A[K];
    } & {
        [K in keyof B]: B[K];
    };
    export {};
}
declare const ZodParsedType: {
    function: "function";
    number: "number";
    string: "string";
    nan: "nan";
    integer: "integer";
    float: "float";
    boolean: "boolean";
    date: "date";
    bigint: "bigint";
    symbol: "symbol";
    undefined: "undefined";
    null: "null";
    array: "array";
    object: "object";
    unknown: "unknown";
    promise: "promise";
    void: "void";
    never: "never";
    map: "map";
    set: "set";
};
declare type ZodParsedType = keyof typeof ZodParsedType;

declare type allKeys<T> = T extends any ? keyof T : never;
declare type typeToFlattenedError<T, U = string> = {
    formErrors: U[];
    fieldErrors: {
        [P in allKeys<T>]?: U[];
    };
};
declare const ZodIssueCode: {
    invalid_type: "invalid_type";
    invalid_literal: "invalid_literal";
    custom: "custom";
    invalid_union: "invalid_union";
    invalid_union_discriminator: "invalid_union_discriminator";
    invalid_enum_value: "invalid_enum_value";
    unrecognized_keys: "unrecognized_keys";
    invalid_arguments: "invalid_arguments";
    invalid_return_type: "invalid_return_type";
    invalid_date: "invalid_date";
    invalid_string: "invalid_string";
    too_small: "too_small";
    too_big: "too_big";
    invalid_intersection_types: "invalid_intersection_types";
    not_multiple_of: "not_multiple_of";
    not_finite: "not_finite";
};
declare type ZodIssueCode = keyof typeof ZodIssueCode;
declare type ZodIssueBase = {
    path: (string | number)[];
    message?: string;
};
interface ZodInvalidTypeIssue extends ZodIssueBase {
    code: typeof ZodIssueCode.invalid_type;
    expected: ZodParsedType;
    received: ZodParsedType;
}
interface ZodInvalidLiteralIssue extends ZodIssueBase {
    code: typeof ZodIssueCode.invalid_literal;
    expected: unknown;
    received: unknown;
}
interface ZodUnrecognizedKeysIssue extends ZodIssueBase {
    code: typeof ZodIssueCode.unrecognized_keys;
    keys: string[];
}
interface ZodInvalidUnionIssue extends ZodIssueBase {
    code: typeof ZodIssueCode.invalid_union;
    unionErrors: ZodError[];
}
interface ZodInvalidUnionDiscriminatorIssue extends ZodIssueBase {
    code: typeof ZodIssueCode.invalid_union_discriminator;
    options: Primitive[];
}
interface ZodInvalidEnumValueIssue extends ZodIssueBase {
    received: string | number;
    code: typeof ZodIssueCode.invalid_enum_value;
    options: (string | number)[];
}
interface ZodInvalidArgumentsIssue extends ZodIssueBase {
    code: typeof ZodIssueCode.invalid_arguments;
    argumentsError: ZodError;
}
interface ZodInvalidReturnTypeIssue extends ZodIssueBase {
    code: typeof ZodIssueCode.invalid_return_type;
    returnTypeError: ZodError;
}
interface ZodInvalidDateIssue extends ZodIssueBase {
    code: typeof ZodIssueCode.invalid_date;
}
declare type StringValidation = "email" | "url" | "emoji" | "uuid" | "nanoid" | "regex" | "cuid" | "cuid2" | "ulid" | "datetime" | "date" | "time" | "duration" | "ip" | "base64" | {
    includes: string;
    position?: number;
} | {
    startsWith: string;
} | {
    endsWith: string;
};
interface ZodInvalidStringIssue extends ZodIssueBase {
    code: typeof ZodIssueCode.invalid_string;
    validation: StringValidation;
}
interface ZodTooSmallIssue extends ZodIssueBase {
    code: typeof ZodIssueCode.too_small;
    minimum: number | bigint;
    inclusive: boolean;
    exact?: boolean;
    type: "array" | "string" | "number" | "set" | "date" | "bigint";
}
interface ZodTooBigIssue extends ZodIssueBase {
    code: typeof ZodIssueCode.too_big;
    maximum: number | bigint;
    inclusive: boolean;
    exact?: boolean;
    type: "array" | "string" | "number" | "set" | "date" | "bigint";
}
interface ZodInvalidIntersectionTypesIssue extends ZodIssueBase {
    code: typeof ZodIssueCode.invalid_intersection_types;
}
interface ZodNotMultipleOfIssue extends ZodIssueBase {
    code: typeof ZodIssueCode.not_multiple_of;
    multipleOf: number | bigint;
}
interface ZodNotFiniteIssue extends ZodIssueBase {
    code: typeof ZodIssueCode.not_finite;
}
interface ZodCustomIssue extends ZodIssueBase {
    code: typeof ZodIssueCode.custom;
    params?: {
        [k: string]: any;
    };
}
declare type ZodIssueOptionalMessage = ZodInvalidTypeIssue | ZodInvalidLiteralIssue | ZodUnrecognizedKeysIssue | ZodInvalidUnionIssue | ZodInvalidUnionDiscriminatorIssue | ZodInvalidEnumValueIssue | ZodInvalidArgumentsIssue | ZodInvalidReturnTypeIssue | ZodInvalidDateIssue | ZodInvalidStringIssue | ZodTooSmallIssue | ZodTooBigIssue | ZodInvalidIntersectionTypesIssue | ZodNotMultipleOfIssue | ZodNotFiniteIssue | ZodCustomIssue;
declare type ZodIssue = ZodIssueOptionalMessage & {
    fatal?: boolean;
    message: string;
};
declare type recursiveZodFormattedError<T> = T extends [any, ...any[]] ? {
    [K in keyof T]?: ZodFormattedError<T[K]>;
} : T extends any[] ? {
    [k: number]: ZodFormattedError<T[number]>;
} : T extends object ? {
    [K in keyof T]?: ZodFormattedError<T[K]>;
} : unknown;
declare type ZodFormattedError<T, U = string> = {
    _errors: U[];
} & recursiveZodFormattedError<NonNullable<T>>;
declare class ZodError<T = any> extends Error {
    issues: ZodIssue[];
    get errors(): ZodIssue[];
    constructor(issues: ZodIssue[]);
    format(): ZodFormattedError<T>;
    format<U>(mapper: (issue: ZodIssue) => U): ZodFormattedError<T, U>;
    static create: (issues: ZodIssue[]) => ZodError<any>;
    static assert(value: unknown): asserts value is ZodError;
    toString(): string;
    get message(): string;
    get isEmpty(): boolean;
    addIssue: (sub: ZodIssue) => void;
    addIssues: (subs?: ZodIssue[]) => void;
    flatten(): typeToFlattenedError<T>;
    flatten<U>(mapper?: (issue: ZodIssue) => U): typeToFlattenedError<T, U>;
    get formErrors(): typeToFlattenedError<T, string>;
}
declare type stripPath<T extends object> = T extends any ? util.OmitKeys<T, "path"> : never;
declare type IssueData = stripPath<ZodIssueOptionalMessage> & {
    path?: (string | number)[];
    fatal?: boolean;
};
declare type ErrorMapCtx = {
    defaultError: string;
    data: any;
};
declare type ZodErrorMap = (issue: ZodIssueOptionalMessage, _ctx: ErrorMapCtx) => {
    message: string;
};

declare type ParseParams = {
    path: (string | number)[];
    errorMap: ZodErrorMap;
    async: boolean;
};
declare type ParsePathComponent = string | number;
declare type ParsePath = ParsePathComponent[];
interface ParseContext {
    readonly common: {
        readonly issues: ZodIssue[];
        readonly contextualErrorMap?: ZodErrorMap;
        readonly async: boolean;
    };
    readonly path: ParsePath;
    readonly schemaErrorMap?: ZodErrorMap;
    readonly parent: ParseContext | null;
    readonly data: any;
    readonly parsedType: ZodParsedType;
}
declare type ParseInput = {
    data: any;
    path: (string | number)[];
    parent: ParseContext;
};
declare class ParseStatus {
    value: "aborted" | "dirty" | "valid";
    dirty(): void;
    abort(): void;
    static mergeArray(status: ParseStatus, results: SyncParseReturnType<any>[]): SyncParseReturnType;
    static mergeObjectAsync(status: ParseStatus, pairs: {
        key: ParseReturnType<any>;
        value: ParseReturnType<any>;
    }[]): Promise<SyncParseReturnType<any>>;
    static mergeObjectSync(status: ParseStatus, pairs: {
        key: SyncParseReturnType<any>;
        value: SyncParseReturnType<any>;
        alwaysSet?: boolean;
    }[]): SyncParseReturnType;
}
declare type INVALID = {
    status: "aborted";
};
declare const INVALID: INVALID;
declare type DIRTY<T> = {
    status: "dirty";
    value: T;
};
declare const DIRTY: <T>(value: T) => DIRTY<T>;
declare type OK<T> = {
    status: "valid";
    value: T;
};
declare const OK: <T>(value: T) => OK<T>;
declare type SyncParseReturnType<T = any> = OK<T> | DIRTY<T> | INVALID;
declare type AsyncParseReturnType<T> = Promise<SyncParseReturnType<T>>;
declare type ParseReturnType<T> = SyncParseReturnType<T> | AsyncParseReturnType<T>;

declare namespace enumUtil {
    type UnionToIntersectionFn<T> = (T extends unknown ? (k: () => T) => void : never) extends (k: infer Intersection) => void ? Intersection : never;
    type GetUnionLast<T> = UnionToIntersectionFn<T> extends () => infer Last ? Last : never;
    type UnionToTuple<T, Tuple extends unknown[] = []> = [T] extends [never] ? Tuple : UnionToTuple<Exclude<T, GetUnionLast<T>>, [GetUnionLast<T>, ...Tuple]>;
    type CastToStringTuple<T> = T extends [string, ...string[]] ? T : never;
    export type UnionToTupleString<T> = CastToStringTuple<UnionToTuple<T>>;
    export {};
}

declare namespace errorUtil {
    type ErrMessage = string | {
        message?: string;
    };
    const errToObj: (message?: ErrMessage | undefined) => {
        message?: string | undefined;
    };
    const toString: (message?: ErrMessage | undefined) => string | undefined;
}

declare namespace partialUtil {
    type DeepPartial<T extends ZodTypeAny> = T extends ZodObject<ZodRawShape> ? ZodObject<{
        [k in keyof T["shape"]]: ZodOptional<DeepPartial<T["shape"][k]>>;
    }, T["_def"]["unknownKeys"], T["_def"]["catchall"]> : T extends ZodArray<infer Type, infer Card> ? ZodArray<DeepPartial<Type>, Card> : T extends ZodOptional<infer Type> ? ZodOptional<DeepPartial<Type>> : T extends ZodNullable<infer Type> ? ZodNullable<DeepPartial<Type>> : T extends ZodTuple<infer Items> ? {
        [k in keyof Items]: Items[k] extends ZodTypeAny ? DeepPartial<Items[k]> : never;
    } extends infer PI ? PI extends ZodTupleItems ? ZodTuple<PI> : never : never : T;
}

interface RefinementCtx {
    addIssue: (arg: IssueData) => void;
    path: (string | number)[];
}
declare type ZodRawShape = {
    [k: string]: ZodTypeAny;
};
declare type ZodTypeAny = ZodType<any, any, any>;
declare type TypeOf<T extends ZodType<any, any, any>> = T["_output"];
declare type input<T extends ZodType<any, any, any>> = T["_input"];
declare type output<T extends ZodType<any, any, any>> = T["_output"];

declare type CustomErrorParams = Partial<util.Omit<ZodCustomIssue, "code">>;
interface ZodTypeDef {
    errorMap?: ZodErrorMap;
    description?: string;
}
declare type RawCreateParams = {
    errorMap?: ZodErrorMap;
    invalid_type_error?: string;
    required_error?: string;
    message?: string;
    description?: string;
} | undefined;
declare type SafeParseSuccess<Output> = {
    success: true;
    data: Output;
    error?: never;
};
declare type SafeParseError<Input> = {
    success: false;
    error: ZodError<Input>;
    data?: never;
};
declare type SafeParseReturnType<Input, Output> = SafeParseSuccess<Output> | SafeParseError<Input>;
declare abstract class ZodType<Output = any, Def extends ZodTypeDef = ZodTypeDef, Input = Output> {
    readonly _type: Output;
    readonly _output: Output;
    readonly _input: Input;
    readonly _def: Def;
    get description(): string | undefined;
    abstract _parse(input: ParseInput): ParseReturnType<Output>;
    _getType(input: ParseInput): string;
    _getOrReturnCtx(input: ParseInput, ctx?: ParseContext | undefined): ParseContext;
    _processInputParams(input: ParseInput): {
        status: ParseStatus;
        ctx: ParseContext;
    };
    _parseSync(input: ParseInput): SyncParseReturnType<Output>;
    _parseAsync(input: ParseInput): AsyncParseReturnType<Output>;
    parse(data: unknown, params?: Partial<ParseParams>): Output;
    safeParse(data: unknown, params?: Partial<ParseParams>): SafeParseReturnType<Input, Output>;
    parseAsync(data: unknown, params?: Partial<ParseParams>): Promise<Output>;
    safeParseAsync(data: unknown, params?: Partial<ParseParams>): Promise<SafeParseReturnType<Input, Output>>;
    /** Alias of safeParseAsync */
    spa: (data: unknown, params?: Partial<ParseParams> | undefined) => Promise<SafeParseReturnType<Input, Output>>;
    refine<RefinedOutput extends Output>(check: (arg: Output) => arg is RefinedOutput, message?: string | CustomErrorParams | ((arg: Output) => CustomErrorParams)): ZodEffects<this, RefinedOutput, Input>;
    refine(check: (arg: Output) => unknown | Promise<unknown>, message?: string | CustomErrorParams | ((arg: Output) => CustomErrorParams)): ZodEffects<this, Output, Input>;
    refinement<RefinedOutput extends Output>(check: (arg: Output) => arg is RefinedOutput, refinementData: IssueData | ((arg: Output, ctx: RefinementCtx) => IssueData)): ZodEffects<this, RefinedOutput, Input>;
    refinement(check: (arg: Output) => boolean, refinementData: IssueData | ((arg: Output, ctx: RefinementCtx) => IssueData)): ZodEffects<this, Output, Input>;
    _refinement(refinement: RefinementEffect<Output>["refinement"]): ZodEffects<this, Output, Input>;
    superRefine<RefinedOutput extends Output>(refinement: (arg: Output, ctx: RefinementCtx) => arg is RefinedOutput): ZodEffects<this, RefinedOutput, Input>;
    superRefine(refinement: (arg: Output, ctx: RefinementCtx) => void): ZodEffects<this, Output, Input>;
    superRefine(refinement: (arg: Output, ctx: RefinementCtx) => Promise<void>): ZodEffects<this, Output, Input>;
    constructor(def: Def);
    optional(): ZodOptional<this>;
    nullable(): ZodNullable<this>;
    nullish(): ZodOptional<ZodNullable<this>>;
    array(): ZodArray<this>;
    promise(): ZodPromise<this>;
    or<T extends ZodTypeAny>(option: T): ZodUnion<[this, T]>;
    and<T extends ZodTypeAny>(incoming: T): ZodIntersection<this, T>;
    transform<NewOut>(transform: (arg: Output, ctx: RefinementCtx) => NewOut | Promise<NewOut>): ZodEffects<this, NewOut>;
    default(def: util.noUndefined<Input>): ZodDefault<this>;
    default(def: () => util.noUndefined<Input>): ZodDefault<this>;
    brand<B extends string | number | symbol>(brand?: B): ZodBranded<this, B>;
    catch(def: Output): ZodCatch<this>;
    catch(def: (ctx: {
        error: ZodError;
        input: Input;
    }) => Output): ZodCatch<this>;
    describe(description: string): this;
    pipe<T extends ZodTypeAny>(target: T): ZodPipeline<this, T>;
    readonly(): ZodReadonly<this>;
    isOptional(): boolean;
    isNullable(): boolean;
}
declare type IpVersion = "v4" | "v6";
declare type ZodStringCheck = {
    kind: "min";
    value: number;
    message?: string;
} | {
    kind: "max";
    value: number;
    message?: string;
} | {
    kind: "length";
    value: number;
    message?: string;
} | {
    kind: "email";
    message?: string;
} | {
    kind: "url";
    message?: string;
} | {
    kind: "emoji";
    message?: string;
} | {
    kind: "uuid";
    message?: string;
} | {
    kind: "nanoid";
    message?: string;
} | {
    kind: "cuid";
    message?: string;
} | {
    kind: "includes";
    value: string;
    position?: number;
    message?: string;
} | {
    kind: "cuid2";
    message?: string;
} | {
    kind: "ulid";
    message?: string;
} | {
    kind: "startsWith";
    value: string;
    message?: string;
} | {
    kind: "endsWith";
    value: string;
    message?: string;
} | {
    kind: "regex";
    regex: RegExp;
    message?: string;
} | {
    kind: "trim";
    message?: string;
} | {
    kind: "toLowerCase";
    message?: string;
} | {
    kind: "toUpperCase";
    message?: string;
} | {
    kind: "datetime";
    offset: boolean;
    local: boolean;
    precision: number | null;
    message?: string;
} | {
    kind: "date";
    message?: string;
} | {
    kind: "time";
    precision: number | null;
    message?: string;
} | {
    kind: "duration";
    message?: string;
} | {
    kind: "ip";
    version?: IpVersion;
    message?: string;
} | {
    kind: "base64";
    message?: string;
};
interface ZodStringDef extends ZodTypeDef {
    checks: ZodStringCheck[];
    typeName: ZodFirstPartyTypeKind.ZodString;
    coerce: boolean;
}
declare class ZodString extends ZodType<string, ZodStringDef, string> {
    _parse(input: ParseInput): ParseReturnType<string>;
    protected _regex(regex: RegExp, validation: StringValidation, message?: errorUtil.ErrMessage): ZodEffects<this, string, string>;
    _addCheck(check: ZodStringCheck): ZodString;
    email(message?: errorUtil.ErrMessage): ZodString;
    url(message?: errorUtil.ErrMessage): ZodString;
    emoji(message?: errorUtil.ErrMessage): ZodString;
    uuid(message?: errorUtil.ErrMessage): ZodString;
    nanoid(message?: errorUtil.ErrMessage): ZodString;
    cuid(message?: errorUtil.ErrMessage): ZodString;
    cuid2(message?: errorUtil.ErrMessage): ZodString;
    ulid(message?: errorUtil.ErrMessage): ZodString;
    base64(message?: errorUtil.ErrMessage): ZodString;
    ip(options?: string | {
        version?: "v4" | "v6";
        message?: string;
    }): ZodString;
    datetime(options?: string | {
        message?: string | undefined;
        precision?: number | null;
        offset?: boolean;
        local?: boolean;
    }): ZodString;
    date(message?: string): ZodString;
    time(options?: string | {
        message?: string | undefined;
        precision?: number | null;
    }): ZodString;
    duration(message?: errorUtil.ErrMessage): ZodString;
    regex(regex: RegExp, message?: errorUtil.ErrMessage): ZodString;
    includes(value: string, options?: {
        message?: string;
        position?: number;
    }): ZodString;
    startsWith(value: string, message?: errorUtil.ErrMessage): ZodString;
    endsWith(value: string, message?: errorUtil.ErrMessage): ZodString;
    min(minLength: number, message?: errorUtil.ErrMessage): ZodString;
    max(maxLength: number, message?: errorUtil.ErrMessage): ZodString;
    length(len: number, message?: errorUtil.ErrMessage): ZodString;
    /**
     * @deprecated Use z.string().min(1) instead.
     * @see {@link ZodString.min}
     */
    nonempty(message?: errorUtil.ErrMessage): ZodString;
    trim(): ZodString;
    toLowerCase(): ZodString;
    toUpperCase(): ZodString;
    get isDatetime(): boolean;
    get isDate(): boolean;
    get isTime(): boolean;
    get isDuration(): boolean;
    get isEmail(): boolean;
    get isURL(): boolean;
    get isEmoji(): boolean;
    get isUUID(): boolean;
    get isNANOID(): boolean;
    get isCUID(): boolean;
    get isCUID2(): boolean;
    get isULID(): boolean;
    get isIP(): boolean;
    get isBase64(): boolean;
    get minLength(): number | null;
    get maxLength(): number | null;
    static create: (params?: ({
        errorMap?: ZodErrorMap | undefined;
        invalid_type_error?: string | undefined;
        required_error?: string | undefined;
        message?: string | undefined;
        description?: string | undefined;
    } & {
        coerce?: true | undefined;
    }) | undefined) => ZodString;
}
declare type ZodNumberCheck = {
    kind: "min";
    value: number;
    inclusive: boolean;
    message?: string;
} | {
    kind: "max";
    value: number;
    inclusive: boolean;
    message?: string;
} | {
    kind: "int";
    message?: string;
} | {
    kind: "multipleOf";
    value: number;
    message?: string;
} | {
    kind: "finite";
    message?: string;
};
interface ZodNumberDef extends ZodTypeDef {
    checks: ZodNumberCheck[];
    typeName: ZodFirstPartyTypeKind.ZodNumber;
    coerce: boolean;
}
declare class ZodNumber extends ZodType<number, ZodNumberDef, number> {
    _parse(input: ParseInput): ParseReturnType<number>;
    static create: (params?: ({
        errorMap?: ZodErrorMap | undefined;
        invalid_type_error?: string | undefined;
        required_error?: string | undefined;
        message?: string | undefined;
        description?: string | undefined;
    } & {
        coerce?: boolean | undefined;
    }) | undefined) => ZodNumber;
    gte(value: number, message?: errorUtil.ErrMessage): ZodNumber;
    min: (value: number, message?: errorUtil.ErrMessage | undefined) => ZodNumber;
    gt(value: number, message?: errorUtil.ErrMessage): ZodNumber;
    lte(value: number, message?: errorUtil.ErrMessage): ZodNumber;
    max: (value: number, message?: errorUtil.ErrMessage | undefined) => ZodNumber;
    lt(value: number, message?: errorUtil.ErrMessage): ZodNumber;
    protected setLimit(kind: "min" | "max", value: number, inclusive: boolean, message?: string): ZodNumber;
    _addCheck(check: ZodNumberCheck): ZodNumber;
    int(message?: errorUtil.ErrMessage): ZodNumber;
    positive(message?: errorUtil.ErrMessage): ZodNumber;
    negative(message?: errorUtil.ErrMessage): ZodNumber;
    nonpositive(message?: errorUtil.ErrMessage): ZodNumber;
    nonnegative(message?: errorUtil.ErrMessage): ZodNumber;
    multipleOf(value: number, message?: errorUtil.ErrMessage): ZodNumber;
    step: (value: number, message?: errorUtil.ErrMessage | undefined) => ZodNumber;
    finite(message?: errorUtil.ErrMessage): ZodNumber;
    safe(message?: errorUtil.ErrMessage): ZodNumber;
    get minValue(): number | null;
    get maxValue(): number | null;
    get isInt(): boolean;
    get isFinite(): boolean;
}
interface ZodBooleanDef extends ZodTypeDef {
    typeName: ZodFirstPartyTypeKind.ZodBoolean;
    coerce: boolean;
}
declare class ZodBoolean extends ZodType<boolean, ZodBooleanDef, boolean> {
    _parse(input: ParseInput): ParseReturnType<boolean>;
    static create: (params?: ({
        errorMap?: ZodErrorMap | undefined;
        invalid_type_error?: string | undefined;
        required_error?: string | undefined;
        message?: string | undefined;
        description?: string | undefined;
    } & {
        coerce?: boolean | undefined;
    }) | undefined) => ZodBoolean;
}
interface ZodAnyDef extends ZodTypeDef {
    typeName: ZodFirstPartyTypeKind.ZodAny;
}
declare class ZodAny extends ZodType<any, ZodAnyDef, any> {
    _any: true;
    _parse(input: ParseInput): ParseReturnType<this["_output"]>;
    static create: (params?: RawCreateParams) => ZodAny;
}
interface ZodArrayDef<T extends ZodTypeAny = ZodTypeAny> extends ZodTypeDef {
    type: T;
    typeName: ZodFirstPartyTypeKind.ZodArray;
    exactLength: {
        value: number;
        message?: string;
    } | null;
    minLength: {
        value: number;
        message?: string;
    } | null;
    maxLength: {
        value: number;
        message?: string;
    } | null;
}
declare type ArrayCardinality = "many" | "atleastone";
declare type arrayOutputType<T extends ZodTypeAny, Cardinality extends ArrayCardinality = "many"> = Cardinality extends "atleastone" ? [T["_output"], ...T["_output"][]] : T["_output"][];
declare class ZodArray<T extends ZodTypeAny, Cardinality extends ArrayCardinality = "many"> extends ZodType<arrayOutputType<T, Cardinality>, ZodArrayDef<T>, Cardinality extends "atleastone" ? [T["_input"], ...T["_input"][]] : T["_input"][]> {
    _parse(input: ParseInput): ParseReturnType<this["_output"]>;
    get element(): T;
    min(minLength: number, message?: errorUtil.ErrMessage): this;
    max(maxLength: number, message?: errorUtil.ErrMessage): this;
    length(len: number, message?: errorUtil.ErrMessage): this;
    nonempty(message?: errorUtil.ErrMessage): ZodArray<T, "atleastone">;
    static create: <T_1 extends ZodTypeAny>(schema: T_1, params?: RawCreateParams) => ZodArray<T_1, "many">;
}
declare type UnknownKeysParam = "passthrough" | "strict" | "strip";
interface ZodObjectDef<T extends ZodRawShape = ZodRawShape, UnknownKeys extends UnknownKeysParam = UnknownKeysParam, Catchall extends ZodTypeAny = ZodTypeAny> extends ZodTypeDef {
    typeName: ZodFirstPartyTypeKind.ZodObject;
    shape: () => T;
    catchall: Catchall;
    unknownKeys: UnknownKeys;
}
declare type objectOutputType<Shape extends ZodRawShape, Catchall extends ZodTypeAny, UnknownKeys extends UnknownKeysParam = UnknownKeysParam> = objectUtil.flatten<objectUtil.addQuestionMarks<baseObjectOutputType<Shape>>> & CatchallOutput<Catchall> & PassthroughType<UnknownKeys>;
declare type baseObjectOutputType<Shape extends ZodRawShape> = {
    [k in keyof Shape]: Shape[k]["_output"];
};
declare type objectInputType<Shape extends ZodRawShape, Catchall extends ZodTypeAny, UnknownKeys extends UnknownKeysParam = UnknownKeysParam> = objectUtil.flatten<baseObjectInputType<Shape>> & CatchallInput<Catchall> & PassthroughType<UnknownKeys>;
declare type baseObjectInputType<Shape extends ZodRawShape> = objectUtil.addQuestionMarks<{
    [k in keyof Shape]: Shape[k]["_input"];
}>;
declare type CatchallOutput<T extends ZodType> = ZodType extends T ? unknown : {
    [k: string]: T["_output"];
};
declare type CatchallInput<T extends ZodType> = ZodType extends T ? unknown : {
    [k: string]: T["_input"];
};
declare type PassthroughType<T extends UnknownKeysParam> = T extends "passthrough" ? {
    [k: string]: unknown;
} : unknown;
declare type deoptional<T extends ZodTypeAny> = T extends ZodOptional<infer U> ? deoptional<U> : T extends ZodNullable<infer U> ? ZodNullable<deoptional<U>> : T;
declare class ZodObject<T extends ZodRawShape, UnknownKeys extends UnknownKeysParam = UnknownKeysParam, Catchall extends ZodTypeAny = ZodTypeAny, Output = objectOutputType<T, Catchall, UnknownKeys>, Input = objectInputType<T, Catchall, UnknownKeys>> extends ZodType<Output, ZodObjectDef<T, UnknownKeys, Catchall>, Input> {
    private _cached;
    _getCached(): {
        shape: T;
        keys: string[];
    };
    _parse(input: ParseInput): ParseReturnType<this["_output"]>;
    get shape(): T;
    strict(message?: errorUtil.ErrMessage): ZodObject<T, "strict", Catchall>;
    strip(): ZodObject<T, "strip", Catchall>;
    passthrough(): ZodObject<T, "passthrough", Catchall>;
    /**
     * @deprecated In most cases, this is no longer needed - unknown properties are now silently stripped.
     * If you want to pass through unknown properties, use `.passthrough()` instead.
     */
    nonstrict: () => ZodObject<T, "passthrough", Catchall>;
    extend<Augmentation extends ZodRawShape>(augmentation: Augmentation): ZodObject<objectUtil.extendShape<T, Augmentation>, UnknownKeys, Catchall>;
    /**
     * @deprecated Use `.extend` instead
     *  */
    augment: <Augmentation extends ZodRawShape>(augmentation: Augmentation) => ZodObject<objectUtil.extendShape<T, Augmentation>, UnknownKeys, Catchall, objectOutputType<objectUtil.extendShape<T, Augmentation>, Catchall, UnknownKeys>, objectInputType<objectUtil.extendShape<T, Augmentation>, Catchall, UnknownKeys>>;
    /**
     * Prior to zod@1.0.12 there was a bug in the
     * inferred type of merged objects. Please
     * upgrade if you are experiencing issues.
     */
    merge<Incoming extends AnyZodObject, Augmentation extends Incoming["shape"]>(merging: Incoming): ZodObject<objectUtil.extendShape<T, Augmentation>, Incoming["_def"]["unknownKeys"], Incoming["_def"]["catchall"]>;
    setKey<Key extends string, Schema extends ZodTypeAny>(key: Key, schema: Schema): ZodObject<T & {
        [k in Key]: Schema;
    }, UnknownKeys, Catchall>;
    catchall<Index extends ZodTypeAny>(index: Index): ZodObject<T, UnknownKeys, Index>;
    pick<Mask extends util.Exactly<{
        [k in keyof T]?: true;
    }, Mask>>(mask: Mask): ZodObject<Pick<T, Extract<keyof T, keyof Mask>>, UnknownKeys, Catchall>;
    omit<Mask extends util.Exactly<{
        [k in keyof T]?: true;
    }, Mask>>(mask: Mask): ZodObject<Omit<T, keyof Mask>, UnknownKeys, Catchall>;
    /**
     * @deprecated
     */
    deepPartial(): partialUtil.DeepPartial<this>;
    partial(): ZodObject<{
        [k in keyof T]: ZodOptional<T[k]>;
    }, UnknownKeys, Catchall>;
    partial<Mask extends util.Exactly<{
        [k in keyof T]?: true;
    }, Mask>>(mask: Mask): ZodObject<objectUtil.noNever<{
        [k in keyof T]: k extends keyof Mask ? ZodOptional<T[k]> : T[k];
    }>, UnknownKeys, Catchall>;
    required(): ZodObject<{
        [k in keyof T]: deoptional<T[k]>;
    }, UnknownKeys, Catchall>;
    required<Mask extends util.Exactly<{
        [k in keyof T]?: true;
    }, Mask>>(mask: Mask): ZodObject<objectUtil.noNever<{
        [k in keyof T]: k extends keyof Mask ? deoptional<T[k]> : T[k];
    }>, UnknownKeys, Catchall>;
    keyof(): ZodEnum<enumUtil.UnionToTupleString<keyof T>>;
    static create: <T_1 extends ZodRawShape>(shape: T_1, params?: RawCreateParams) => ZodObject<T_1, "strip", ZodTypeAny, { [k in keyof objectUtil.addQuestionMarks<baseObjectOutputType<T_1>, any>]: objectUtil.addQuestionMarks<baseObjectOutputType<T_1>, any>[k]; }, { [k_1 in keyof baseObjectInputType<T_1>]: baseObjectInputType<T_1>[k_1]; }>;
    static strictCreate: <T_1 extends ZodRawShape>(shape: T_1, params?: RawCreateParams) => ZodObject<T_1, "strict", ZodTypeAny, { [k in keyof objectUtil.addQuestionMarks<baseObjectOutputType<T_1>, any>]: objectUtil.addQuestionMarks<baseObjectOutputType<T_1>, any>[k]; }, { [k_1 in keyof baseObjectInputType<T_1>]: baseObjectInputType<T_1>[k_1]; }>;
    static lazycreate: <T_1 extends ZodRawShape>(shape: () => T_1, params?: RawCreateParams) => ZodObject<T_1, "strip", ZodTypeAny, { [k in keyof objectUtil.addQuestionMarks<baseObjectOutputType<T_1>, any>]: objectUtil.addQuestionMarks<baseObjectOutputType<T_1>, any>[k]; }, { [k_1 in keyof baseObjectInputType<T_1>]: baseObjectInputType<T_1>[k_1]; }>;
}
declare type AnyZodObject = ZodObject<any, any, any>;
declare type ZodUnionOptions = Readonly<[ZodTypeAny, ...ZodTypeAny[]]>;
interface ZodUnionDef<T extends ZodUnionOptions = Readonly<[
    ZodTypeAny,
    ZodTypeAny,
    ...ZodTypeAny[]
]>> extends ZodTypeDef {
    options: T;
    typeName: ZodFirstPartyTypeKind.ZodUnion;
}
declare class ZodUnion<T extends ZodUnionOptions> extends ZodType<T[number]["_output"], ZodUnionDef<T>, T[number]["_input"]> {
    _parse(input: ParseInput): ParseReturnType<this["_output"]>;
    get options(): T;
    static create: <T_1 extends readonly [ZodTypeAny, ZodTypeAny, ...ZodTypeAny[]]>(types: T_1, params?: RawCreateParams) => ZodUnion<T_1>;
}
interface ZodIntersectionDef<T extends ZodTypeAny = ZodTypeAny, U extends ZodTypeAny = ZodTypeAny> extends ZodTypeDef {
    left: T;
    right: U;
    typeName: ZodFirstPartyTypeKind.ZodIntersection;
}
declare class ZodIntersection<T extends ZodTypeAny, U extends ZodTypeAny> extends ZodType<T["_output"] & U["_output"], ZodIntersectionDef<T, U>, T["_input"] & U["_input"]> {
    _parse(input: ParseInput): ParseReturnType<this["_output"]>;
    static create: <T_1 extends ZodTypeAny, U_1 extends ZodTypeAny>(left: T_1, right: U_1, params?: RawCreateParams) => ZodIntersection<T_1, U_1>;
}
declare type ZodTupleItems = [ZodTypeAny, ...ZodTypeAny[]];
declare type AssertArray<T> = T extends any[] ? T : never;
declare type OutputTypeOfTuple<T extends ZodTupleItems | []> = AssertArray<{
    [k in keyof T]: T[k] extends ZodType<any, any, any> ? T[k]["_output"] : never;
}>;
declare type OutputTypeOfTupleWithRest<T extends ZodTupleItems | [], Rest extends ZodTypeAny | null = null> = Rest extends ZodTypeAny ? [...OutputTypeOfTuple<T>, ...Rest["_output"][]] : OutputTypeOfTuple<T>;
declare type InputTypeOfTuple<T extends ZodTupleItems | []> = AssertArray<{
    [k in keyof T]: T[k] extends ZodType<any, any, any> ? T[k]["_input"] : never;
}>;
declare type InputTypeOfTupleWithRest<T extends ZodTupleItems | [], Rest extends ZodTypeAny | null = null> = Rest extends ZodTypeAny ? [...InputTypeOfTuple<T>, ...Rest["_input"][]] : InputTypeOfTuple<T>;
interface ZodTupleDef<T extends ZodTupleItems | [] = ZodTupleItems, Rest extends ZodTypeAny | null = null> extends ZodTypeDef {
    items: T;
    rest: Rest;
    typeName: ZodFirstPartyTypeKind.ZodTuple;
}
declare class ZodTuple<T extends [ZodTypeAny, ...ZodTypeAny[]] | [] = [ZodTypeAny, ...ZodTypeAny[]], Rest extends ZodTypeAny | null = null> extends ZodType<OutputTypeOfTupleWithRest<T, Rest>, ZodTupleDef<T, Rest>, InputTypeOfTupleWithRest<T, Rest>> {
    _parse(input: ParseInput): ParseReturnType<this["_output"]>;
    get items(): T;
    rest<Rest extends ZodTypeAny>(rest: Rest): ZodTuple<T, Rest>;
    static create: <T_1 extends [] | [ZodTypeAny, ...ZodTypeAny[]]>(schemas: T_1, params?: RawCreateParams) => ZodTuple<T_1, null>;
}
interface ZodRecordDef<Key extends KeySchema = ZodString, Value extends ZodTypeAny = ZodTypeAny> extends ZodTypeDef {
    valueType: Value;
    keyType: Key;
    typeName: ZodFirstPartyTypeKind.ZodRecord;
}
declare type KeySchema = ZodType<string | number | symbol, any, any>;
declare type RecordType<K extends string | number | symbol, V> = [
    string
] extends [K] ? Record<K, V> : [number] extends [K] ? Record<K, V> : [symbol] extends [K] ? Record<K, V> : [BRAND<string | number | symbol>] extends [K] ? Record<K, V> : Partial<Record<K, V>>;
declare class ZodRecord<Key extends KeySchema = ZodString, Value extends ZodTypeAny = ZodTypeAny> extends ZodType<RecordType<Key["_output"], Value["_output"]>, ZodRecordDef<Key, Value>, RecordType<Key["_input"], Value["_input"]>> {
    get keySchema(): Key;
    get valueSchema(): Value;
    _parse(input: ParseInput): ParseReturnType<this["_output"]>;
    get element(): Value;
    static create<Value extends ZodTypeAny>(valueType: Value, params?: RawCreateParams): ZodRecord<ZodString, Value>;
    static create<Keys extends KeySchema, Value extends ZodTypeAny>(keySchema: Keys, valueType: Value, params?: RawCreateParams): ZodRecord<Keys, Value>;
}
declare type EnumValues<T extends string = string> = readonly [T, ...T[]];
declare type Values<T extends EnumValues> = {
    [k in T[number]]: k;
};
interface ZodEnumDef<T extends EnumValues = EnumValues> extends ZodTypeDef {
    values: T;
    typeName: ZodFirstPartyTypeKind.ZodEnum;
}
declare type Writeable<T> = {
    -readonly [P in keyof T]: T[P];
};
declare type FilterEnum<Values, ToExclude> = Values extends [] ? [] : Values extends [infer Head, ...infer Rest] ? Head extends ToExclude ? FilterEnum<Rest, ToExclude> : [Head, ...FilterEnum<Rest, ToExclude>] : never;
declare type typecast<A, T> = A extends T ? A : never;
declare function createZodEnum<U extends string, T extends Readonly<[U, ...U[]]>>(values: T, params?: RawCreateParams): ZodEnum<Writeable<T>>;
declare function createZodEnum<U extends string, T extends [U, ...U[]]>(values: T, params?: RawCreateParams): ZodEnum<T>;
declare class ZodEnum<T extends [string, ...string[]]> extends ZodType<T[number], ZodEnumDef<T>, T[number]> {
    #private;
    _parse(input: ParseInput): ParseReturnType<this["_output"]>;
    get options(): T;
    get enum(): Values<T>;
    get Values(): Values<T>;
    get Enum(): Values<T>;
    extract<ToExtract extends readonly [T[number], ...T[number][]]>(values: ToExtract, newDef?: RawCreateParams): ZodEnum<Writeable<ToExtract>>;
    exclude<ToExclude extends readonly [T[number], ...T[number][]]>(values: ToExclude, newDef?: RawCreateParams): ZodEnum<typecast<Writeable<FilterEnum<T, ToExclude[number]>>, [string, ...string[]]>>;
    static create: typeof createZodEnum;
}
interface ZodPromiseDef<T extends ZodTypeAny = ZodTypeAny> extends ZodTypeDef {
    type: T;
    typeName: ZodFirstPartyTypeKind.ZodPromise;
}
declare class ZodPromise<T extends ZodTypeAny> extends ZodType<Promise<T["_output"]>, ZodPromiseDef<T>, Promise<T["_input"]>> {
    unwrap(): T;
    _parse(input: ParseInput): ParseReturnType<this["_output"]>;
    static create: <T_1 extends ZodTypeAny>(schema: T_1, params?: RawCreateParams) => ZodPromise<T_1>;
}
declare type RefinementEffect<T> = {
    type: "refinement";
    refinement: (arg: T, ctx: RefinementCtx) => any;
};
declare type TransformEffect<T> = {
    type: "transform";
    transform: (arg: T, ctx: RefinementCtx) => any;
};
declare type PreprocessEffect<T> = {
    type: "preprocess";
    transform: (arg: T, ctx: RefinementCtx) => any;
};
declare type Effect<T> = RefinementEffect<T> | TransformEffect<T> | PreprocessEffect<T>;
interface ZodEffectsDef<T extends ZodTypeAny = ZodTypeAny> extends ZodTypeDef {
    schema: T;
    typeName: ZodFirstPartyTypeKind.ZodEffects;
    effect: Effect<any>;
}
declare class ZodEffects<T extends ZodTypeAny, Output = output<T>, Input = input<T>> extends ZodType<Output, ZodEffectsDef<T>, Input> {
    innerType(): T;
    sourceType(): T;
    _parse(input: ParseInput): ParseReturnType<this["_output"]>;
    static create: <I extends ZodTypeAny>(schema: I, effect: Effect<I["_output"]>, params?: RawCreateParams) => ZodEffects<I, I["_output"], input<I>>;
    static createWithPreprocess: <I extends ZodTypeAny>(preprocess: (arg: unknown, ctx: RefinementCtx) => unknown, schema: I, params?: RawCreateParams) => ZodEffects<I, I["_output"], unknown>;
}

interface ZodOptionalDef<T extends ZodTypeAny = ZodTypeAny> extends ZodTypeDef {
    innerType: T;
    typeName: ZodFirstPartyTypeKind.ZodOptional;
}
declare class ZodOptional<T extends ZodTypeAny> extends ZodType<T["_output"] | undefined, ZodOptionalDef<T>, T["_input"] | undefined> {
    _parse(input: ParseInput): ParseReturnType<this["_output"]>;
    unwrap(): T;
    static create: <T_1 extends ZodTypeAny>(type: T_1, params?: RawCreateParams) => ZodOptional<T_1>;
}
interface ZodNullableDef<T extends ZodTypeAny = ZodTypeAny> extends ZodTypeDef {
    innerType: T;
    typeName: ZodFirstPartyTypeKind.ZodNullable;
}
declare class ZodNullable<T extends ZodTypeAny> extends ZodType<T["_output"] | null, ZodNullableDef<T>, T["_input"] | null> {
    _parse(input: ParseInput): ParseReturnType<this["_output"]>;
    unwrap(): T;
    static create: <T_1 extends ZodTypeAny>(type: T_1, params?: RawCreateParams) => ZodNullable<T_1>;
}
interface ZodDefaultDef<T extends ZodTypeAny = ZodTypeAny> extends ZodTypeDef {
    innerType: T;
    defaultValue: () => util.noUndefined<T["_input"]>;
    typeName: ZodFirstPartyTypeKind.ZodDefault;
}
declare class ZodDefault<T extends ZodTypeAny> extends ZodType<util.noUndefined<T["_output"]>, ZodDefaultDef<T>, T["_input"] | undefined> {
    _parse(input: ParseInput): ParseReturnType<this["_output"]>;
    removeDefault(): T;
    static create: <T_1 extends ZodTypeAny>(type: T_1, params: {
        errorMap?: ZodErrorMap | undefined;
        invalid_type_error?: string | undefined;
        required_error?: string | undefined;
        message?: string | undefined;
        description?: string | undefined;
    } & {
        default: T_1["_input"] | (() => util.noUndefined<T_1["_input"]>);
    }) => ZodDefault<T_1>;
}
interface ZodCatchDef<T extends ZodTypeAny = ZodTypeAny> extends ZodTypeDef {
    innerType: T;
    catchValue: (ctx: {
        error: ZodError;
        input: unknown;
    }) => T["_input"];
    typeName: ZodFirstPartyTypeKind.ZodCatch;
}
declare class ZodCatch<T extends ZodTypeAny> extends ZodType<T["_output"], ZodCatchDef<T>, unknown> {
    _parse(input: ParseInput): ParseReturnType<this["_output"]>;
    removeCatch(): T;
    static create: <T_1 extends ZodTypeAny>(type: T_1, params: {
        errorMap?: ZodErrorMap | undefined;
        invalid_type_error?: string | undefined;
        required_error?: string | undefined;
        message?: string | undefined;
        description?: string | undefined;
    } & {
        catch: T_1["_output"] | (() => T_1["_output"]);
    }) => ZodCatch<T_1>;
}
interface ZodBrandedDef<T extends ZodTypeAny> extends ZodTypeDef {
    type: T;
    typeName: ZodFirstPartyTypeKind.ZodBranded;
}
declare const BRAND: unique symbol;
declare type BRAND<T extends string | number | symbol> = {
    [BRAND]: {
        [k in T]: true;
    };
};
declare class ZodBranded<T extends ZodTypeAny, B extends string | number | symbol> extends ZodType<T["_output"] & BRAND<B>, ZodBrandedDef<T>, T["_input"]> {
    _parse(input: ParseInput): ParseReturnType<any>;
    unwrap(): T;
}
interface ZodPipelineDef<A extends ZodTypeAny, B extends ZodTypeAny> extends ZodTypeDef {
    in: A;
    out: B;
    typeName: ZodFirstPartyTypeKind.ZodPipeline;
}
declare class ZodPipeline<A extends ZodTypeAny, B extends ZodTypeAny> extends ZodType<B["_output"], ZodPipelineDef<A, B>, A["_input"]> {
    _parse(input: ParseInput): ParseReturnType<any>;
    static create<A extends ZodTypeAny, B extends ZodTypeAny>(a: A, b: B): ZodPipeline<A, B>;
}
declare type BuiltIn = (((...args: any[]) => any) | (new (...args: any[]) => any)) | {
    readonly [Symbol.toStringTag]: string;
} | Date | Error | Generator | Promise<unknown> | RegExp;
declare type MakeReadonly<T> = T extends Map<infer K, infer V> ? ReadonlyMap<K, V> : T extends Set<infer V> ? ReadonlySet<V> : T extends [infer Head, ...infer Tail] ? readonly [Head, ...Tail] : T extends Array<infer V> ? ReadonlyArray<V> : T extends BuiltIn ? T : Readonly<T>;
interface ZodReadonlyDef<T extends ZodTypeAny = ZodTypeAny> extends ZodTypeDef {
    innerType: T;
    typeName: ZodFirstPartyTypeKind.ZodReadonly;
}
declare class ZodReadonly<T extends ZodTypeAny> extends ZodType<MakeReadonly<T["_output"]>, ZodReadonlyDef<T>, MakeReadonly<T["_input"]>> {
    _parse(input: ParseInput): ParseReturnType<this["_output"]>;
    static create: <T_1 extends ZodTypeAny>(type: T_1, params?: RawCreateParams) => ZodReadonly<T_1>;
    unwrap(): T;
}
declare enum ZodFirstPartyTypeKind {
    ZodString = "ZodString",
    ZodNumber = "ZodNumber",
    ZodNaN = "ZodNaN",
    ZodBigInt = "ZodBigInt",
    ZodBoolean = "ZodBoolean",
    ZodDate = "ZodDate",
    ZodSymbol = "ZodSymbol",
    ZodUndefined = "ZodUndefined",
    ZodNull = "ZodNull",
    ZodAny = "ZodAny",
    ZodUnknown = "ZodUnknown",
    ZodNever = "ZodNever",
    ZodVoid = "ZodVoid",
    ZodArray = "ZodArray",
    ZodObject = "ZodObject",
    ZodUnion = "ZodUnion",
    ZodDiscriminatedUnion = "ZodDiscriminatedUnion",
    ZodIntersection = "ZodIntersection",
    ZodTuple = "ZodTuple",
    ZodRecord = "ZodRecord",
    ZodMap = "ZodMap",
    ZodSet = "ZodSet",
    ZodFunction = "ZodFunction",
    ZodLazy = "ZodLazy",
    ZodLiteral = "ZodLiteral",
    ZodEnum = "ZodEnum",
    ZodEffects = "ZodEffects",
    ZodNativeEnum = "ZodNativeEnum",
    ZodOptional = "ZodOptional",
    ZodNullable = "ZodNullable",
    ZodDefault = "ZodDefault",
    ZodCatch = "ZodCatch",
    ZodPromise = "ZodPromise",
    ZodBranded = "ZodBranded",
    ZodPipeline = "ZodPipeline",
    ZodReadonly = "ZodReadonly"
}

declare const InstructionSchema: ZodEnum<["look_left", "look_right", "open_mouth", "see_straight"]>;
declare const ScreenOrientationSchema: ZodEnum<["auto", "landscape", "portrait"]>;
declare const UrlSchema: ZodString;
declare const CompressionAlgorithmSchema: ZodObject<{
    dimension: ZodTuple<[ZodNumber, ZodNumber], null>;
    fileSizeThreshold: ZodNumber;
    qualityThreshold: ZodOptional<ZodNumber>;
}, "strip", ZodTypeAny, {
    dimension: [number, number];
    fileSizeThreshold: number;
    qualityThreshold?: number | undefined;
}, {
    dimension: [number, number];
    fileSizeThreshold: number;
    qualityThreshold?: number | undefined;
}>;
declare const ProxyMiddlewareSchema: ZodObject<{
    License: ZodObject<{
        headers: ZodOptional<ZodRecord<ZodString, ZodAny>>;
        params: ZodOptional<ZodRecord<ZodString, ZodAny>>;
        metaparameter: ZodOptional<ZodRecord<ZodString, ZodAny>>;
        url: ZodString;
    }, "strip", ZodTypeAny, {
        url: string;
        params?: Record<string, any> | undefined;
        headers?: Record<string, any> | undefined;
        metaparameter?: Record<string, any> | undefined;
    }, {
        url: string;
        params?: Record<string, any> | undefined;
        headers?: Record<string, any> | undefined;
        metaparameter?: Record<string, any> | undefined;
    }>;
    PassiveLiveness: ZodObject<{
        headers: ZodOptional<ZodRecord<ZodString, ZodAny>>;
        params: ZodOptional<ZodRecord<ZodString, ZodAny>>;
        metaparameter: ZodOptional<ZodRecord<ZodString, ZodAny>>;
        url: ZodString;
    }, "strip", ZodTypeAny, {
        url: string;
        params?: Record<string, any> | undefined;
        headers?: Record<string, any> | undefined;
        metaparameter?: Record<string, any> | undefined;
    }, {
        url: string;
        params?: Record<string, any> | undefined;
        headers?: Record<string, any> | undefined;
        metaparameter?: Record<string, any> | undefined;
    }>;
    GenerateKey: ZodOptional<ZodObject<{
        headers: ZodOptional<ZodRecord<ZodString, ZodAny>>;
        params: ZodOptional<ZodRecord<ZodString, ZodAny>>;
        metaparameter: ZodOptional<ZodRecord<ZodString, ZodAny>>;
        url: ZodString;
    }, "strip", ZodTypeAny, {
        url: string;
        params?: Record<string, any> | undefined;
        headers?: Record<string, any> | undefined;
        metaparameter?: Record<string, any> | undefined;
    }, {
        url: string;
        params?: Record<string, any> | undefined;
        headers?: Record<string, any> | undefined;
        metaparameter?: Record<string, any> | undefined;
    }>>;
    Deepfake: ZodOptional<ZodObject<{
        headers: ZodOptional<ZodRecord<ZodString, ZodAny>>;
        params: ZodOptional<ZodRecord<ZodString, ZodAny>>;
        metaparameter: ZodOptional<ZodRecord<ZodString, ZodAny>>;
        url: ZodString;
    }, "strip", ZodTypeAny, {
        url: string;
        params?: Record<string, any> | undefined;
        headers?: Record<string, any> | undefined;
        metaparameter?: Record<string, any> | undefined;
    }, {
        url: string;
        params?: Record<string, any> | undefined;
        headers?: Record<string, any> | undefined;
        metaparameter?: Record<string, any> | undefined;
    }>>;
}, "strip", ZodTypeAny, {
    License: {
        url: string;
        params?: Record<string, any> | undefined;
        headers?: Record<string, any> | undefined;
        metaparameter?: Record<string, any> | undefined;
    };
    PassiveLiveness: {
        url: string;
        params?: Record<string, any> | undefined;
        headers?: Record<string, any> | undefined;
        metaparameter?: Record<string, any> | undefined;
    };
    GenerateKey?: {
        url: string;
        params?: Record<string, any> | undefined;
        headers?: Record<string, any> | undefined;
        metaparameter?: Record<string, any> | undefined;
    } | undefined;
    Deepfake?: {
        url: string;
        params?: Record<string, any> | undefined;
        headers?: Record<string, any> | undefined;
        metaparameter?: Record<string, any> | undefined;
    } | undefined;
}, {
    License: {
        url: string;
        params?: Record<string, any> | undefined;
        headers?: Record<string, any> | undefined;
        metaparameter?: Record<string, any> | undefined;
    };
    PassiveLiveness: {
        url: string;
        params?: Record<string, any> | undefined;
        headers?: Record<string, any> | undefined;
        metaparameter?: Record<string, any> | undefined;
    };
    GenerateKey?: {
        url: string;
        params?: Record<string, any> | undefined;
        headers?: Record<string, any> | undefined;
        metaparameter?: Record<string, any> | undefined;
    } | undefined;
    Deepfake?: {
        url: string;
        params?: Record<string, any> | undefined;
        headers?: Record<string, any> | undefined;
        metaparameter?: Record<string, any> | undefined;
    } | undefined;
}>;
declare const CredentialSchema: ZodObject<{
    clientId: ZodString;
    secret: ZodString;
}, "strip", ZodTypeAny, {
    clientId: string;
    secret: string;
}, {
    clientId: string;
    secret: string;
}>;
declare const PartialLivenessContentConfigurationSchema: ZodObject<{
    Instruction: ZodOptional<ZodObject<{
        title: ZodOptional<ZodString>;
        subtitle: ZodOptional<ZodString>;
        instructions: ZodOptional<ZodArray<ZodObject<{
            caption: ZodOptional<ZodString>;
            image: ZodOptional<ZodString>;
        }, "strip", ZodTypeAny, {
            caption?: string | undefined;
            image?: string | undefined;
        }, {
            caption?: string | undefined;
            image?: string | undefined;
        }>, "many">>;
        action: ZodOptional<ZodObject<{
            backIcon: ZodOptional<ZodString>;
            start: ZodOptional<ZodString>;
            next: ZodOptional<ZodString>;
        }, "strip", ZodTypeAny, {
            backIcon?: string | undefined;
            start?: string | undefined;
            next?: string | undefined;
        }, {
            backIcon?: string | undefined;
            start?: string | undefined;
            next?: string | undefined;
        }>>;
    }, "strip", ZodTypeAny, {
        title?: string | undefined;
        subtitle?: string | undefined;
        instructions?: {
            caption?: string | undefined;
            image?: string | undefined;
        }[] | undefined;
        action?: {
            backIcon?: string | undefined;
            start?: string | undefined;
            next?: string | undefined;
        } | undefined;
    }, {
        title?: string | undefined;
        subtitle?: string | undefined;
        instructions?: {
            caption?: string | undefined;
            image?: string | undefined;
        }[] | undefined;
        action?: {
            backIcon?: string | undefined;
            start?: string | undefined;
            next?: string | undefined;
        } | undefined;
    }>>;
    Verification: ZodOptional<ZodObject<{
        title: ZodOptional<ZodString>;
        action: ZodOptional<ZodObject<{
            backIcon: ZodOptional<ZodString>;
        }, "strip", ZodTypeAny, {
            backIcon?: string | undefined;
        }, {
            backIcon?: string | undefined;
        }>>;
        instruction: ZodOptional<ZodObject<{
            loading: ZodOptional<ZodObject<{
                caption: ZodOptional<ZodString>;
                image: ZodOptional<ZodString>;
                sound: ZodOptional<ZodString>;
            }, "strip", ZodTypeAny, {
                caption?: string | undefined;
                image?: string | undefined;
                sound?: string | undefined;
            }, {
                caption?: string | undefined;
                image?: string | undefined;
                sound?: string | undefined;
            }>>;
            processing: ZodOptional<ZodObject<{
                caption: ZodOptional<ZodString>;
                image: ZodOptional<ZodString>;
                sound: ZodOptional<ZodString>;
            }, "strip", ZodTypeAny, {
                caption?: string | undefined;
                image?: string | undefined;
                sound?: string | undefined;
            }, {
                caption?: string | undefined;
                image?: string | undefined;
                sound?: string | undefined;
            }>>;
        }, "strip", ZodTypeAny, {
            loading?: {
                caption?: string | undefined;
                image?: string | undefined;
                sound?: string | undefined;
            } | undefined;
            processing?: {
                caption?: string | undefined;
                image?: string | undefined;
                sound?: string | undefined;
            } | undefined;
        }, {
            loading?: {
                caption?: string | undefined;
                image?: string | undefined;
                sound?: string | undefined;
            } | undefined;
            processing?: {
                caption?: string | undefined;
                image?: string | undefined;
                sound?: string | undefined;
            } | undefined;
        }>>;
    }, "strip", ZodTypeAny, {
        title?: string | undefined;
        action?: {
            backIcon?: string | undefined;
        } | undefined;
        instruction?: {
            loading?: {
                caption?: string | undefined;
                image?: string | undefined;
                sound?: string | undefined;
            } | undefined;
            processing?: {
                caption?: string | undefined;
                image?: string | undefined;
                sound?: string | undefined;
            } | undefined;
        } | undefined;
    }, {
        title?: string | undefined;
        action?: {
            backIcon?: string | undefined;
        } | undefined;
        instruction?: {
            loading?: {
                caption?: string | undefined;
                image?: string | undefined;
                sound?: string | undefined;
            } | undefined;
            processing?: {
                caption?: string | undefined;
                image?: string | undefined;
                sound?: string | undefined;
            } | undefined;
        } | undefined;
    }>>;
    Result: ZodOptional<ZodObject<{
        icon: ZodOptional<ZodString>;
        description: ZodOptional<ZodString>;
    }, "strip", ZodTypeAny, {
        icon?: string | undefined;
        description?: string | undefined;
    }, {
        icon?: string | undefined;
        description?: string | undefined;
    }>>;
}, "strip", ZodTypeAny, {
    Instruction?: {
        title?: string | undefined;
        subtitle?: string | undefined;
        instructions?: {
            caption?: string | undefined;
            image?: string | undefined;
        }[] | undefined;
        action?: {
            backIcon?: string | undefined;
            start?: string | undefined;
            next?: string | undefined;
        } | undefined;
    } | undefined;
    Verification?: {
        title?: string | undefined;
        action?: {
            backIcon?: string | undefined;
        } | undefined;
        instruction?: {
            loading?: {
                caption?: string | undefined;
                image?: string | undefined;
                sound?: string | undefined;
            } | undefined;
            processing?: {
                caption?: string | undefined;
                image?: string | undefined;
                sound?: string | undefined;
            } | undefined;
        } | undefined;
    } | undefined;
    Result?: {
        icon?: string | undefined;
        description?: string | undefined;
    } | undefined;
}, {
    Instruction?: {
        title?: string | undefined;
        subtitle?: string | undefined;
        instructions?: {
            caption?: string | undefined;
            image?: string | undefined;
        }[] | undefined;
        action?: {
            backIcon?: string | undefined;
            start?: string | undefined;
            next?: string | undefined;
        } | undefined;
    } | undefined;
    Verification?: {
        title?: string | undefined;
        action?: {
            backIcon?: string | undefined;
        } | undefined;
        instruction?: {
            loading?: {
                caption?: string | undefined;
                image?: string | undefined;
                sound?: string | undefined;
            } | undefined;
            processing?: {
                caption?: string | undefined;
                image?: string | undefined;
                sound?: string | undefined;
            } | undefined;
        } | undefined;
    } | undefined;
    Result?: {
        icon?: string | undefined;
        description?: string | undefined;
    } | undefined;
}>;
declare const PartialLivenessThemeConfigurationSchema: ZodObject<{
    Component: ZodOptional<ZodObject<{
        Instruction: ZodOptional<ZodObject<{
            frameContainer: ZodOptional<ZodObject<{
                backgroundColor: ZodOptional<ZodString>;
            }, "strip", ZodTypeAny, {
                backgroundColor?: string | undefined;
            }, {
                backgroundColor?: string | undefined;
            }>>;
            title: ZodOptional<ZodObject<{
                color: ZodOptional<ZodString>;
                fontSize: ZodOptional<ZodString>;
            }, "strip", ZodTypeAny, {
                color?: string | undefined;
                fontSize?: string | undefined;
            }, {
                color?: string | undefined;
                fontSize?: string | undefined;
            }>>;
            subtitle: ZodOptional<ZodObject<{
                color: ZodOptional<ZodString>;
                fontSize: ZodOptional<ZodString>;
            }, "strip", ZodTypeAny, {
                color?: string | undefined;
                fontSize?: string | undefined;
            }, {
                color?: string | undefined;
                fontSize?: string | undefined;
            }>>;
            figcaption: ZodOptional<ZodObject<{
                color: ZodOptional<ZodString>;
                fontSize: ZodOptional<ZodString>;
            }, "strip", ZodTypeAny, {
                color?: string | undefined;
                fontSize?: string | undefined;
            }, {
                color?: string | undefined;
                fontSize?: string | undefined;
            }>>;
            action: ZodOptional<ZodObject<{
                start: ZodOptional<ZodObject<{
                    color: ZodOptional<ZodString>;
                    fontSize: ZodOptional<ZodString>;
                    backgroundColor: ZodOptional<ZodString>;
                    hover: ZodOptional<ZodObject<{
                        backgroundColor: ZodOptional<ZodString>;
                    }, "strip", ZodTypeAny, {
                        backgroundColor?: string | undefined;
                    }, {
                        backgroundColor?: string | undefined;
                    }>>;
                }, "strip", ZodTypeAny, {
                    backgroundColor?: string | undefined;
                    color?: string | undefined;
                    fontSize?: string | undefined;
                    hover?: {
                        backgroundColor?: string | undefined;
                    } | undefined;
                }, {
                    backgroundColor?: string | undefined;
                    color?: string | undefined;
                    fontSize?: string | undefined;
                    hover?: {
                        backgroundColor?: string | undefined;
                    } | undefined;
                }>>;
                next: ZodOptional<ZodObject<{
                    color: ZodOptional<ZodString>;
                    fontSize: ZodOptional<ZodString>;
                    backgroundColor: ZodOptional<ZodString>;
                    hover: ZodOptional<ZodObject<{
                        backgroundColor: ZodOptional<ZodString>;
                    }, "strip", ZodTypeAny, {
                        backgroundColor?: string | undefined;
                    }, {
                        backgroundColor?: string | undefined;
                    }>>;
                }, "strip", ZodTypeAny, {
                    backgroundColor?: string | undefined;
                    color?: string | undefined;
                    fontSize?: string | undefined;
                    hover?: {
                        backgroundColor?: string | undefined;
                    } | undefined;
                }, {
                    backgroundColor?: string | undefined;
                    color?: string | undefined;
                    fontSize?: string | undefined;
                    hover?: {
                        backgroundColor?: string | undefined;
                    } | undefined;
                }>>;
            }, "strip", ZodTypeAny, {
                start?: {
                    backgroundColor?: string | undefined;
                    color?: string | undefined;
                    fontSize?: string | undefined;
                    hover?: {
                        backgroundColor?: string | undefined;
                    } | undefined;
                } | undefined;
                next?: {
                    backgroundColor?: string | undefined;
                    color?: string | undefined;
                    fontSize?: string | undefined;
                    hover?: {
                        backgroundColor?: string | undefined;
                    } | undefined;
                } | undefined;
            }, {
                start?: {
                    backgroundColor?: string | undefined;
                    color?: string | undefined;
                    fontSize?: string | undefined;
                    hover?: {
                        backgroundColor?: string | undefined;
                    } | undefined;
                } | undefined;
                next?: {
                    backgroundColor?: string | undefined;
                    color?: string | undefined;
                    fontSize?: string | undefined;
                    hover?: {
                        backgroundColor?: string | undefined;
                    } | undefined;
                } | undefined;
            }>>;
        }, "strip", ZodTypeAny, {
            title?: {
                color?: string | undefined;
                fontSize?: string | undefined;
            } | undefined;
            subtitle?: {
                color?: string | undefined;
                fontSize?: string | undefined;
            } | undefined;
            action?: {
                start?: {
                    backgroundColor?: string | undefined;
                    color?: string | undefined;
                    fontSize?: string | undefined;
                    hover?: {
                        backgroundColor?: string | undefined;
                    } | undefined;
                } | undefined;
                next?: {
                    backgroundColor?: string | undefined;
                    color?: string | undefined;
                    fontSize?: string | undefined;
                    hover?: {
                        backgroundColor?: string | undefined;
                    } | undefined;
                } | undefined;
            } | undefined;
            frameContainer?: {
                backgroundColor?: string | undefined;
            } | undefined;
            figcaption?: {
                color?: string | undefined;
                fontSize?: string | undefined;
            } | undefined;
        }, {
            title?: {
                color?: string | undefined;
                fontSize?: string | undefined;
            } | undefined;
            subtitle?: {
                color?: string | undefined;
                fontSize?: string | undefined;
            } | undefined;
            action?: {
                start?: {
                    backgroundColor?: string | undefined;
                    color?: string | undefined;
                    fontSize?: string | undefined;
                    hover?: {
                        backgroundColor?: string | undefined;
                    } | undefined;
                } | undefined;
                next?: {
                    backgroundColor?: string | undefined;
                    color?: string | undefined;
                    fontSize?: string | undefined;
                    hover?: {
                        backgroundColor?: string | undefined;
                    } | undefined;
                } | undefined;
            } | undefined;
            frameContainer?: {
                backgroundColor?: string | undefined;
            } | undefined;
            figcaption?: {
                color?: string | undefined;
                fontSize?: string | undefined;
            } | undefined;
        }>>;
        Verification: ZodOptional<ZodObject<{
            frameContainer: ZodOptional<ZodObject<{
                backgroundColor: ZodOptional<ZodString>;
            }, "strip", ZodTypeAny, {
                backgroundColor?: string | undefined;
            }, {
                backgroundColor?: string | undefined;
            }>>;
            title: ZodOptional<ZodObject<{
                color: ZodOptional<ZodString>;
                fontSize: ZodOptional<ZodString>;
            }, "strip", ZodTypeAny, {
                color?: string | undefined;
                fontSize?: string | undefined;
            }, {
                color?: string | undefined;
                fontSize?: string | undefined;
            }>>;
            camera: ZodOptional<ZodObject<{
                initial: ZodOptional<ZodObject<{
                    borderColor: ZodOptional<ZodString>;
                }, "strip", ZodTypeAny, {
                    borderColor?: string | undefined;
                }, {
                    borderColor?: string | undefined;
                }>>;
                undetected: ZodOptional<ZodObject<{
                    borderColor: ZodOptional<ZodString>;
                }, "strip", ZodTypeAny, {
                    borderColor?: string | undefined;
                }, {
                    borderColor?: string | undefined;
                }>>;
                detected: ZodOptional<ZodObject<{
                    borderColor: ZodOptional<ZodString>;
                }, "strip", ZodTypeAny, {
                    borderColor?: string | undefined;
                }, {
                    borderColor?: string | undefined;
                }>>;
            }, "strip", ZodTypeAny, {
                initial?: {
                    borderColor?: string | undefined;
                } | undefined;
                undetected?: {
                    borderColor?: string | undefined;
                } | undefined;
                detected?: {
                    borderColor?: string | undefined;
                } | undefined;
            }, {
                initial?: {
                    borderColor?: string | undefined;
                } | undefined;
                undetected?: {
                    borderColor?: string | undefined;
                } | undefined;
                detected?: {
                    borderColor?: string | undefined;
                } | undefined;
            }>>;
            instruction: ZodOptional<ZodObject<{
                backgroundColor: ZodOptional<ZodString>;
                color: ZodOptional<ZodString>;
                fontSize: ZodOptional<ZodString>;
            }, "strip", ZodTypeAny, {
                backgroundColor?: string | undefined;
                color?: string | undefined;
                fontSize?: string | undefined;
            }, {
                backgroundColor?: string | undefined;
                color?: string | undefined;
                fontSize?: string | undefined;
            }>>;
        }, "strip", ZodTypeAny, {
            title?: {
                color?: string | undefined;
                fontSize?: string | undefined;
            } | undefined;
            instruction?: {
                backgroundColor?: string | undefined;
                color?: string | undefined;
                fontSize?: string | undefined;
            } | undefined;
            frameContainer?: {
                backgroundColor?: string | undefined;
            } | undefined;
            camera?: {
                initial?: {
                    borderColor?: string | undefined;
                } | undefined;
                undetected?: {
                    borderColor?: string | undefined;
                } | undefined;
                detected?: {
                    borderColor?: string | undefined;
                } | undefined;
            } | undefined;
        }, {
            title?: {
                color?: string | undefined;
                fontSize?: string | undefined;
            } | undefined;
            instruction?: {
                backgroundColor?: string | undefined;
                color?: string | undefined;
                fontSize?: string | undefined;
            } | undefined;
            frameContainer?: {
                backgroundColor?: string | undefined;
            } | undefined;
            camera?: {
                initial?: {
                    borderColor?: string | undefined;
                } | undefined;
                undetected?: {
                    borderColor?: string | undefined;
                } | undefined;
                detected?: {
                    borderColor?: string | undefined;
                } | undefined;
            } | undefined;
        }>>;
        Result: ZodOptional<ZodObject<{
            frameContainer: ZodOptional<ZodObject<{
                backgroundColor: ZodOptional<ZodString>;
            }, "strip", ZodTypeAny, {
                backgroundColor?: string | undefined;
            }, {
                backgroundColor?: string | undefined;
            }>>;
            description: ZodOptional<ZodObject<{
                color: ZodOptional<ZodString>;
                fontSize: ZodOptional<ZodString>;
            }, "strip", ZodTypeAny, {
                color?: string | undefined;
                fontSize?: string | undefined;
            }, {
                color?: string | undefined;
                fontSize?: string | undefined;
            }>>;
        }, "strip", ZodTypeAny, {
            description?: {
                color?: string | undefined;
                fontSize?: string | undefined;
            } | undefined;
            frameContainer?: {
                backgroundColor?: string | undefined;
            } | undefined;
        }, {
            description?: {
                color?: string | undefined;
                fontSize?: string | undefined;
            } | undefined;
            frameContainer?: {
                backgroundColor?: string | undefined;
            } | undefined;
        }>>;
        Shared: ZodOptional<ZodObject<{
            background: ZodOptional<ZodObject<{
                backgroundColor: ZodOptional<ZodString>;
                backgroundImage: ZodOptional<ZodString>;
                backgroundSize: ZodOptional<ZodString>;
            }, "strip", ZodTypeAny, {
                backgroundColor?: string | undefined;
                backgroundImage?: string | undefined;
                backgroundSize?: string | undefined;
            }, {
                backgroundColor?: string | undefined;
                backgroundImage?: string | undefined;
                backgroundSize?: string | undefined;
            }>>;
        }, "strip", ZodTypeAny, {
            background?: {
                backgroundColor?: string | undefined;
                backgroundImage?: string | undefined;
                backgroundSize?: string | undefined;
            } | undefined;
        }, {
            background?: {
                backgroundColor?: string | undefined;
                backgroundImage?: string | undefined;
                backgroundSize?: string | undefined;
            } | undefined;
        }>>;
    }, "strip", ZodTypeAny, {
        Instruction?: {
            title?: {
                color?: string | undefined;
                fontSize?: string | undefined;
            } | undefined;
            subtitle?: {
                color?: string | undefined;
                fontSize?: string | undefined;
            } | undefined;
            action?: {
                start?: {
                    backgroundColor?: string | undefined;
                    color?: string | undefined;
                    fontSize?: string | undefined;
                    hover?: {
                        backgroundColor?: string | undefined;
                    } | undefined;
                } | undefined;
                next?: {
                    backgroundColor?: string | undefined;
                    color?: string | undefined;
                    fontSize?: string | undefined;
                    hover?: {
                        backgroundColor?: string | undefined;
                    } | undefined;
                } | undefined;
            } | undefined;
            frameContainer?: {
                backgroundColor?: string | undefined;
            } | undefined;
            figcaption?: {
                color?: string | undefined;
                fontSize?: string | undefined;
            } | undefined;
        } | undefined;
        Verification?: {
            title?: {
                color?: string | undefined;
                fontSize?: string | undefined;
            } | undefined;
            instruction?: {
                backgroundColor?: string | undefined;
                color?: string | undefined;
                fontSize?: string | undefined;
            } | undefined;
            frameContainer?: {
                backgroundColor?: string | undefined;
            } | undefined;
            camera?: {
                initial?: {
                    borderColor?: string | undefined;
                } | undefined;
                undetected?: {
                    borderColor?: string | undefined;
                } | undefined;
                detected?: {
                    borderColor?: string | undefined;
                } | undefined;
            } | undefined;
        } | undefined;
        Result?: {
            description?: {
                color?: string | undefined;
                fontSize?: string | undefined;
            } | undefined;
            frameContainer?: {
                backgroundColor?: string | undefined;
            } | undefined;
        } | undefined;
        Shared?: {
            background?: {
                backgroundColor?: string | undefined;
                backgroundImage?: string | undefined;
                backgroundSize?: string | undefined;
            } | undefined;
        } | undefined;
    }, {
        Instruction?: {
            title?: {
                color?: string | undefined;
                fontSize?: string | undefined;
            } | undefined;
            subtitle?: {
                color?: string | undefined;
                fontSize?: string | undefined;
            } | undefined;
            action?: {
                start?: {
                    backgroundColor?: string | undefined;
                    color?: string | undefined;
                    fontSize?: string | undefined;
                    hover?: {
                        backgroundColor?: string | undefined;
                    } | undefined;
                } | undefined;
                next?: {
                    backgroundColor?: string | undefined;
                    color?: string | undefined;
                    fontSize?: string | undefined;
                    hover?: {
                        backgroundColor?: string | undefined;
                    } | undefined;
                } | undefined;
            } | undefined;
            frameContainer?: {
                backgroundColor?: string | undefined;
            } | undefined;
            figcaption?: {
                color?: string | undefined;
                fontSize?: string | undefined;
            } | undefined;
        } | undefined;
        Verification?: {
            title?: {
                color?: string | undefined;
                fontSize?: string | undefined;
            } | undefined;
            instruction?: {
                backgroundColor?: string | undefined;
                color?: string | undefined;
                fontSize?: string | undefined;
            } | undefined;
            frameContainer?: {
                backgroundColor?: string | undefined;
            } | undefined;
            camera?: {
                initial?: {
                    borderColor?: string | undefined;
                } | undefined;
                undetected?: {
                    borderColor?: string | undefined;
                } | undefined;
                detected?: {
                    borderColor?: string | undefined;
                } | undefined;
            } | undefined;
        } | undefined;
        Result?: {
            description?: {
                color?: string | undefined;
                fontSize?: string | undefined;
            } | undefined;
            frameContainer?: {
                backgroundColor?: string | undefined;
            } | undefined;
        } | undefined;
        Shared?: {
            background?: {
                backgroundColor?: string | undefined;
                backgroundImage?: string | undefined;
                backgroundSize?: string | undefined;
            } | undefined;
        } | undefined;
    }>>;
    Palette: ZodOptional<ZodObject<{
        primary: ZodOptional<ZodObject<{
            contrastText: ZodOptional<ZodString>;
            default: ZodOptional<ZodString>;
            LIGHT: ZodOptional<ZodString>;
            DARK: ZodOptional<ZodString>;
        }, "strip", ZodTypeAny, {
            contrastText?: string | undefined;
            default?: string | undefined;
            LIGHT?: string | undefined;
            DARK?: string | undefined;
        }, {
            contrastText?: string | undefined;
            default?: string | undefined;
            LIGHT?: string | undefined;
            DARK?: string | undefined;
        }>>;
        secondary: ZodOptional<ZodObject<{
            contrastText: ZodOptional<ZodString>;
            default: ZodOptional<ZodString>;
            LIGHT: ZodOptional<ZodString>;
            DARK: ZodOptional<ZodString>;
        }, "strip", ZodTypeAny, {
            contrastText?: string | undefined;
            default?: string | undefined;
            LIGHT?: string | undefined;
            DARK?: string | undefined;
        }, {
            contrastText?: string | undefined;
            default?: string | undefined;
            LIGHT?: string | undefined;
            DARK?: string | undefined;
        }>>;
    }, "strip", ZodTypeAny, {
        primary?: {
            contrastText?: string | undefined;
            default?: string | undefined;
            LIGHT?: string | undefined;
            DARK?: string | undefined;
        } | undefined;
        secondary?: {
            contrastText?: string | undefined;
            default?: string | undefined;
            LIGHT?: string | undefined;
            DARK?: string | undefined;
        } | undefined;
    }, {
        primary?: {
            contrastText?: string | undefined;
            default?: string | undefined;
            LIGHT?: string | undefined;
            DARK?: string | undefined;
        } | undefined;
        secondary?: {
            contrastText?: string | undefined;
            default?: string | undefined;
            LIGHT?: string | undefined;
            DARK?: string | undefined;
        } | undefined;
    }>>;
    Typography: ZodOptional<ZodObject<{
        fontFamily: ZodOptional<ZodArray<ZodString, "many">>;
        fontSize: ZodOptional<ZodObject<{
            title: ZodOptional<ZodString>;
            body: ZodOptional<ZodString>;
            caption: ZodOptional<ZodString>;
            button: ZodOptional<ZodString>;
        }, "strip", ZodTypeAny, {
            title?: string | undefined;
            caption?: string | undefined;
            body?: string | undefined;
            button?: string | undefined;
        }, {
            title?: string | undefined;
            caption?: string | undefined;
            body?: string | undefined;
            button?: string | undefined;
        }>>;
    }, "strip", ZodTypeAny, {
        fontSize?: {
            title?: string | undefined;
            caption?: string | undefined;
            body?: string | undefined;
            button?: string | undefined;
        } | undefined;
        fontFamily?: string[] | undefined;
    }, {
        fontSize?: {
            title?: string | undefined;
            caption?: string | undefined;
            body?: string | undefined;
            button?: string | undefined;
        } | undefined;
        fontFamily?: string[] | undefined;
    }>>;
    VendorPlaceholder: ZodOptional<ZodBoolean>;
}, "strip", ZodTypeAny, {
    Component?: {
        Instruction?: {
            title?: {
                color?: string | undefined;
                fontSize?: string | undefined;
            } | undefined;
            subtitle?: {
                color?: string | undefined;
                fontSize?: string | undefined;
            } | undefined;
            action?: {
                start?: {
                    backgroundColor?: string | undefined;
                    color?: string | undefined;
                    fontSize?: string | undefined;
                    hover?: {
                        backgroundColor?: string | undefined;
                    } | undefined;
                } | undefined;
                next?: {
                    backgroundColor?: string | undefined;
                    color?: string | undefined;
                    fontSize?: string | undefined;
                    hover?: {
                        backgroundColor?: string | undefined;
                    } | undefined;
                } | undefined;
            } | undefined;
            frameContainer?: {
                backgroundColor?: string | undefined;
            } | undefined;
            figcaption?: {
                color?: string | undefined;
                fontSize?: string | undefined;
            } | undefined;
        } | undefined;
        Verification?: {
            title?: {
                color?: string | undefined;
                fontSize?: string | undefined;
            } | undefined;
            instruction?: {
                backgroundColor?: string | undefined;
                color?: string | undefined;
                fontSize?: string | undefined;
            } | undefined;
            frameContainer?: {
                backgroundColor?: string | undefined;
            } | undefined;
            camera?: {
                initial?: {
                    borderColor?: string | undefined;
                } | undefined;
                undetected?: {
                    borderColor?: string | undefined;
                } | undefined;
                detected?: {
                    borderColor?: string | undefined;
                } | undefined;
            } | undefined;
        } | undefined;
        Result?: {
            description?: {
                color?: string | undefined;
                fontSize?: string | undefined;
            } | undefined;
            frameContainer?: {
                backgroundColor?: string | undefined;
            } | undefined;
        } | undefined;
        Shared?: {
            background?: {
                backgroundColor?: string | undefined;
                backgroundImage?: string | undefined;
                backgroundSize?: string | undefined;
            } | undefined;
        } | undefined;
    } | undefined;
    Palette?: {
        primary?: {
            contrastText?: string | undefined;
            default?: string | undefined;
            LIGHT?: string | undefined;
            DARK?: string | undefined;
        } | undefined;
        secondary?: {
            contrastText?: string | undefined;
            default?: string | undefined;
            LIGHT?: string | undefined;
            DARK?: string | undefined;
        } | undefined;
    } | undefined;
    Typography?: {
        fontSize?: {
            title?: string | undefined;
            caption?: string | undefined;
            body?: string | undefined;
            button?: string | undefined;
        } | undefined;
        fontFamily?: string[] | undefined;
    } | undefined;
    VendorPlaceholder?: boolean | undefined;
}, {
    Component?: {
        Instruction?: {
            title?: {
                color?: string | undefined;
                fontSize?: string | undefined;
            } | undefined;
            subtitle?: {
                color?: string | undefined;
                fontSize?: string | undefined;
            } | undefined;
            action?: {
                start?: {
                    backgroundColor?: string | undefined;
                    color?: string | undefined;
                    fontSize?: string | undefined;
                    hover?: {
                        backgroundColor?: string | undefined;
                    } | undefined;
                } | undefined;
                next?: {
                    backgroundColor?: string | undefined;
                    color?: string | undefined;
                    fontSize?: string | undefined;
                    hover?: {
                        backgroundColor?: string | undefined;
                    } | undefined;
                } | undefined;
            } | undefined;
            frameContainer?: {
                backgroundColor?: string | undefined;
            } | undefined;
            figcaption?: {
                color?: string | undefined;
                fontSize?: string | undefined;
            } | undefined;
        } | undefined;
        Verification?: {
            title?: {
                color?: string | undefined;
                fontSize?: string | undefined;
            } | undefined;
            instruction?: {
                backgroundColor?: string | undefined;
                color?: string | undefined;
                fontSize?: string | undefined;
            } | undefined;
            frameContainer?: {
                backgroundColor?: string | undefined;
            } | undefined;
            camera?: {
                initial?: {
                    borderColor?: string | undefined;
                } | undefined;
                undetected?: {
                    borderColor?: string | undefined;
                } | undefined;
                detected?: {
                    borderColor?: string | undefined;
                } | undefined;
            } | undefined;
        } | undefined;
        Result?: {
            description?: {
                color?: string | undefined;
                fontSize?: string | undefined;
            } | undefined;
            frameContainer?: {
                backgroundColor?: string | undefined;
            } | undefined;
        } | undefined;
        Shared?: {
            background?: {
                backgroundColor?: string | undefined;
                backgroundImage?: string | undefined;
                backgroundSize?: string | undefined;
            } | undefined;
        } | undefined;
    } | undefined;
    Palette?: {
        primary?: {
            contrastText?: string | undefined;
            default?: string | undefined;
            LIGHT?: string | undefined;
            DARK?: string | undefined;
        } | undefined;
        secondary?: {
            contrastText?: string | undefined;
            default?: string | undefined;
            LIGHT?: string | undefined;
            DARK?: string | undefined;
        } | undefined;
    } | undefined;
    Typography?: {
        fontSize?: {
            title?: string | undefined;
            caption?: string | undefined;
            body?: string | undefined;
            button?: string | undefined;
        } | undefined;
        fontFamily?: string[] | undefined;
    } | undefined;
    VendorPlaceholder?: boolean | undefined;
}>;
declare const InstructionOptionsSchema: ZodObject<{
    commands: ZodArray<ZodEnum<["look_left", "look_right", "open_mouth", "see_straight"]>, "many">;
    seeds: ZodArray<ZodEnum<["look_left", "look_right", "open_mouth", "see_straight"]>, "many">;
    seedLimit: ZodNumber;
    translator: ZodRecord<ZodEnum<["look_left", "look_right", "open_mouth", "see_straight"]>, ZodString>;
    illustrator: ZodRecord<ZodEnum<["look_left", "look_right", "open_mouth", "see_straight"]>, ZodString>;
    isShowInstruction: ZodBoolean;
    isSoundLooping: ZodBoolean;
    isUseSound: ZodBoolean;
    speaker: ZodRecord<ZodEnum<["look_left", "look_right", "open_mouth", "see_straight"]>, ZodString>;
}, "strip", ZodTypeAny, {
    commands: ("look_left" | "look_right" | "open_mouth" | "see_straight")[];
    seeds: ("look_left" | "look_right" | "open_mouth" | "see_straight")[];
    seedLimit: number;
    translator: Partial<Record<"look_left" | "look_right" | "open_mouth" | "see_straight", string>>;
    illustrator: Partial<Record<"look_left" | "look_right" | "open_mouth" | "see_straight", string>>;
    isShowInstruction: boolean;
    isSoundLooping: boolean;
    isUseSound: boolean;
    speaker: Partial<Record<"look_left" | "look_right" | "open_mouth" | "see_straight", string>>;
}, {
    commands: ("look_left" | "look_right" | "open_mouth" | "see_straight")[];
    seeds: ("look_left" | "look_right" | "open_mouth" | "see_straight")[];
    seedLimit: number;
    translator: Partial<Record<"look_left" | "look_right" | "open_mouth" | "see_straight", string>>;
    illustrator: Partial<Record<"look_left" | "look_right" | "open_mouth" | "see_straight", string>>;
    isShowInstruction: boolean;
    isSoundLooping: boolean;
    isUseSound: boolean;
    speaker: Partial<Record<"look_left" | "look_right" | "open_mouth" | "see_straight", string>>;
}>;
declare const BuilderConfigSchema: ZodObject<objectUtil.extendShape<{
    credential: ZodObject<{
        clientId: ZodString;
        secret: ZodString;
    }, "strip", ZodTypeAny, {
        clientId: string;
        secret: string;
    }, {
        clientId: string;
        secret: string;
    }>;
    camera: ZodObject<{
        virtualLabel: ZodOptional<ZodNullable<ZodArray<ZodString, "many">>>;
    }, "strip", ZodTypeAny, {
        virtualLabel?: string[] | null | undefined;
    }, {
        virtualLabel?: string[] | null | undefined;
    }>;
    disruptDuration: ZodNumber;
    instruction: ZodObject<{
        commands: ZodArray<ZodEnum<["look_left", "look_right", "open_mouth", "see_straight"]>, "many">;
        seeds: ZodArray<ZodEnum<["look_left", "look_right", "open_mouth", "see_straight"]>, "many">;
        seedLimit: ZodNumber;
        translator: ZodRecord<ZodEnum<["look_left", "look_right", "open_mouth", "see_straight"]>, ZodString>;
        illustrator: ZodRecord<ZodEnum<["look_left", "look_right", "open_mouth", "see_straight"]>, ZodString>;
        isShowInstruction: ZodBoolean;
        isSoundLooping: ZodBoolean;
        isUseSound: ZodBoolean;
        speaker: ZodRecord<ZodEnum<["look_left", "look_right", "open_mouth", "see_straight"]>, ZodString>;
    }, "strip", ZodTypeAny, {
        commands: ("look_left" | "look_right" | "open_mouth" | "see_straight")[];
        seeds: ("look_left" | "look_right" | "open_mouth" | "see_straight")[];
        seedLimit: number;
        translator: Partial<Record<"look_left" | "look_right" | "open_mouth" | "see_straight", string>>;
        illustrator: Partial<Record<"look_left" | "look_right" | "open_mouth" | "see_straight", string>>;
        isShowInstruction: boolean;
        isSoundLooping: boolean;
        isUseSound: boolean;
        speaker: Partial<Record<"look_left" | "look_right" | "open_mouth" | "see_straight", string>>;
    }, {
        commands: ("look_left" | "look_right" | "open_mouth" | "see_straight")[];
        seeds: ("look_left" | "look_right" | "open_mouth" | "see_straight")[];
        seedLimit: number;
        translator: Partial<Record<"look_left" | "look_right" | "open_mouth" | "see_straight", string>>;
        illustrator: Partial<Record<"look_left" | "look_right" | "open_mouth" | "see_straight", string>>;
        isShowInstruction: boolean;
        isSoundLooping: boolean;
        isUseSound: boolean;
        speaker: Partial<Record<"look_left" | "look_right" | "open_mouth" | "see_straight", string>>;
    }>;
    metadata: ZodObject<{
        CompressionAlgorithm: ZodObject<{
            dimension: ZodTuple<[ZodNumber, ZodNumber], null>;
            fileSizeThreshold: ZodNumber;
            qualityThreshold: ZodOptional<ZodNumber>;
        }, "strip", ZodTypeAny, {
            dimension: [number, number];
            fileSizeThreshold: number;
            qualityThreshold?: number | undefined;
        }, {
            dimension: [number, number];
            fileSizeThreshold: number;
            qualityThreshold?: number | undefined;
        }>;
        MagicNumber: ZodNumber;
        ScreenOrientation: ZodEnum<["auto", "landscape", "portrait"]>;
        WaitingTime: ZodNumber;
    }, "strip", ZodTypeAny, {
        CompressionAlgorithm: {
            dimension: [number, number];
            fileSizeThreshold: number;
            qualityThreshold?: number | undefined;
        };
        MagicNumber: number;
        ScreenOrientation: "auto" | "landscape" | "portrait";
        WaitingTime: number;
    }, {
        CompressionAlgorithm: {
            dimension: [number, number];
            fileSizeThreshold: number;
            qualityThreshold?: number | undefined;
        };
        MagicNumber: number;
        ScreenOrientation: "auto" | "landscape" | "portrait";
        WaitingTime: number;
    }>;
    proxy: ZodObject<{
        License: ZodObject<{
            headers: ZodOptional<ZodRecord<ZodString, ZodAny>>;
            params: ZodOptional<ZodRecord<ZodString, ZodAny>>;
            metaparameter: ZodOptional<ZodRecord<ZodString, ZodAny>>;
            url: ZodString;
        }, "strip", ZodTypeAny, {
            url: string;
            params?: Record<string, any> | undefined;
            headers?: Record<string, any> | undefined;
            metaparameter?: Record<string, any> | undefined;
        }, {
            url: string;
            params?: Record<string, any> | undefined;
            headers?: Record<string, any> | undefined;
            metaparameter?: Record<string, any> | undefined;
        }>;
        PassiveLiveness: ZodObject<{
            headers: ZodOptional<ZodRecord<ZodString, ZodAny>>;
            params: ZodOptional<ZodRecord<ZodString, ZodAny>>;
            metaparameter: ZodOptional<ZodRecord<ZodString, ZodAny>>;
            url: ZodString;
        }, "strip", ZodTypeAny, {
            url: string;
            params?: Record<string, any> | undefined;
            headers?: Record<string, any> | undefined;
            metaparameter?: Record<string, any> | undefined;
        }, {
            url: string;
            params?: Record<string, any> | undefined;
            headers?: Record<string, any> | undefined;
            metaparameter?: Record<string, any> | undefined;
        }>;
        GenerateKey: ZodOptional<ZodObject<{
            headers: ZodOptional<ZodRecord<ZodString, ZodAny>>;
            params: ZodOptional<ZodRecord<ZodString, ZodAny>>;
            metaparameter: ZodOptional<ZodRecord<ZodString, ZodAny>>;
            url: ZodString;
        }, "strip", ZodTypeAny, {
            url: string;
            params?: Record<string, any> | undefined;
            headers?: Record<string, any> | undefined;
            metaparameter?: Record<string, any> | undefined;
        }, {
            url: string;
            params?: Record<string, any> | undefined;
            headers?: Record<string, any> | undefined;
            metaparameter?: Record<string, any> | undefined;
        }>>;
        Deepfake: ZodOptional<ZodObject<{
            headers: ZodOptional<ZodRecord<ZodString, ZodAny>>;
            params: ZodOptional<ZodRecord<ZodString, ZodAny>>;
            metaparameter: ZodOptional<ZodRecord<ZodString, ZodAny>>;
            url: ZodString;
        }, "strip", ZodTypeAny, {
            url: string;
            params?: Record<string, any> | undefined;
            headers?: Record<string, any> | undefined;
            metaparameter?: Record<string, any> | undefined;
        }, {
            url: string;
            params?: Record<string, any> | undefined;
            headers?: Record<string, any> | undefined;
            metaparameter?: Record<string, any> | undefined;
        }>>;
    }, "strip", ZodTypeAny, {
        License: {
            url: string;
            params?: Record<string, any> | undefined;
            headers?: Record<string, any> | undefined;
            metaparameter?: Record<string, any> | undefined;
        };
        PassiveLiveness: {
            url: string;
            params?: Record<string, any> | undefined;
            headers?: Record<string, any> | undefined;
            metaparameter?: Record<string, any> | undefined;
        };
        GenerateKey?: {
            url: string;
            params?: Record<string, any> | undefined;
            headers?: Record<string, any> | undefined;
            metaparameter?: Record<string, any> | undefined;
        } | undefined;
        Deepfake?: {
            url: string;
            params?: Record<string, any> | undefined;
            headers?: Record<string, any> | undefined;
            metaparameter?: Record<string, any> | undefined;
        } | undefined;
    }, {
        License: {
            url: string;
            params?: Record<string, any> | undefined;
            headers?: Record<string, any> | undefined;
            metaparameter?: Record<string, any> | undefined;
        };
        PassiveLiveness: {
            url: string;
            params?: Record<string, any> | undefined;
            headers?: Record<string, any> | undefined;
            metaparameter?: Record<string, any> | undefined;
        };
        GenerateKey?: {
            url: string;
            params?: Record<string, any> | undefined;
            headers?: Record<string, any> | undefined;
            metaparameter?: Record<string, any> | undefined;
        } | undefined;
        Deepfake?: {
            url: string;
            params?: Record<string, any> | undefined;
            headers?: Record<string, any> | undefined;
            metaparameter?: Record<string, any> | undefined;
        } | undefined;
    }>;
    timeout: ZodNumber;
    content: ZodObject<{
        Instruction: ZodObject<{
            title: ZodString;
            subtitle: ZodString;
            instructions: ZodArray<ZodObject<{
                caption: ZodString;
                image: ZodString;
            }, "strip", ZodTypeAny, {
                caption: string;
                image: string;
            }, {
                caption: string;
                image: string;
            }>, "many">;
            action: ZodObject<{
                backIcon: ZodString;
                start: ZodString;
                next: ZodString;
            }, "strip", ZodTypeAny, {
                backIcon: string;
                start: string;
                next: string;
            }, {
                backIcon: string;
                start: string;
                next: string;
            }>;
        }, "strip", ZodTypeAny, {
            title: string;
            subtitle: string;
            instructions: {
                caption: string;
                image: string;
            }[];
            action: {
                backIcon: string;
                start: string;
                next: string;
            };
        }, {
            title: string;
            subtitle: string;
            instructions: {
                caption: string;
                image: string;
            }[];
            action: {
                backIcon: string;
                start: string;
                next: string;
            };
        }>;
        Verification: ZodObject<{
            title: ZodString;
            action: ZodObject<{
                backIcon: ZodString;
            }, "strip", ZodTypeAny, {
                backIcon: string;
            }, {
                backIcon: string;
            }>;
            instruction: ZodObject<{
                loading: ZodObject<{
                    caption: ZodString;
                    image: ZodString;
                    sound: ZodString;
                }, "strip", ZodTypeAny, {
                    caption: string;
                    image: string;
                    sound: string;
                }, {
                    caption: string;
                    image: string;
                    sound: string;
                }>;
                processing: ZodObject<{
                    caption: ZodString;
                    image: ZodString;
                    sound: ZodString;
                }, "strip", ZodTypeAny, {
                    caption: string;
                    image: string;
                    sound: string;
                }, {
                    caption: string;
                    image: string;
                    sound: string;
                }>;
            }, "strip", ZodTypeAny, {
                loading: {
                    caption: string;
                    image: string;
                    sound: string;
                };
                processing: {
                    caption: string;
                    image: string;
                    sound: string;
                };
            }, {
                loading: {
                    caption: string;
                    image: string;
                    sound: string;
                };
                processing: {
                    caption: string;
                    image: string;
                    sound: string;
                };
            }>;
        }, "strip", ZodTypeAny, {
            title: string;
            action: {
                backIcon: string;
            };
            instruction: {
                loading: {
                    caption: string;
                    image: string;
                    sound: string;
                };
                processing: {
                    caption: string;
                    image: string;
                    sound: string;
                };
            };
        }, {
            title: string;
            action: {
                backIcon: string;
            };
            instruction: {
                loading: {
                    caption: string;
                    image: string;
                    sound: string;
                };
                processing: {
                    caption: string;
                    image: string;
                    sound: string;
                };
            };
        }>;
        Result: ZodObject<{
            icon: ZodString;
            description: ZodString;
        }, "strip", ZodTypeAny, {
            icon: string;
            description: string;
        }, {
            icon: string;
            description: string;
        }>;
    }, "strip", ZodTypeAny, {
        Instruction: {
            title: string;
            subtitle: string;
            instructions: {
                caption: string;
                image: string;
            }[];
            action: {
                backIcon: string;
                start: string;
                next: string;
            };
        };
        Verification: {
            title: string;
            action: {
                backIcon: string;
            };
            instruction: {
                loading: {
                    caption: string;
                    image: string;
                    sound: string;
                };
                processing: {
                    caption: string;
                    image: string;
                    sound: string;
                };
            };
        };
        Result: {
            icon: string;
            description: string;
        };
    }, {
        Instruction: {
            title: string;
            subtitle: string;
            instructions: {
                caption: string;
                image: string;
            }[];
            action: {
                backIcon: string;
                start: string;
                next: string;
            };
        };
        Verification: {
            title: string;
            action: {
                backIcon: string;
            };
            instruction: {
                loading: {
                    caption: string;
                    image: string;
                    sound: string;
                };
                processing: {
                    caption: string;
                    image: string;
                    sound: string;
                };
            };
        };
        Result: {
            icon: string;
            description: string;
        };
    }>;
    theme: ZodObject<{
        Component: ZodObject<{
            Instruction: ZodObject<{
                frameContainer: ZodObject<{
                    backgroundColor: ZodString;
                }, "strip", ZodTypeAny, {
                    backgroundColor: string;
                }, {
                    backgroundColor: string;
                }>;
                title: ZodObject<{
                    color: ZodString;
                    fontSize: ZodString;
                }, "strip", ZodTypeAny, {
                    color: string;
                    fontSize: string;
                }, {
                    color: string;
                    fontSize: string;
                }>;
                subtitle: ZodObject<{
                    color: ZodString;
                    fontSize: ZodString;
                }, "strip", ZodTypeAny, {
                    color: string;
                    fontSize: string;
                }, {
                    color: string;
                    fontSize: string;
                }>;
                figcaption: ZodObject<{
                    color: ZodString;
                    fontSize: ZodString;
                }, "strip", ZodTypeAny, {
                    color: string;
                    fontSize: string;
                }, {
                    color: string;
                    fontSize: string;
                }>;
                action: ZodObject<{
                    start: ZodObject<{
                        color: ZodString;
                        fontSize: ZodString;
                        backgroundColor: ZodString;
                        hover: ZodObject<{
                            backgroundColor: ZodString;
                        }, "strip", ZodTypeAny, {
                            backgroundColor: string;
                        }, {
                            backgroundColor: string;
                        }>;
                    }, "strip", ZodTypeAny, {
                        backgroundColor: string;
                        color: string;
                        fontSize: string;
                        hover: {
                            backgroundColor: string;
                        };
                    }, {
                        backgroundColor: string;
                        color: string;
                        fontSize: string;
                        hover: {
                            backgroundColor: string;
                        };
                    }>;
                    next: ZodObject<{
                        color: ZodString;
                        fontSize: ZodString;
                        backgroundColor: ZodString;
                        hover: ZodObject<{
                            backgroundColor: ZodString;
                        }, "strip", ZodTypeAny, {
                            backgroundColor: string;
                        }, {
                            backgroundColor: string;
                        }>;
                    }, "strip", ZodTypeAny, {
                        backgroundColor: string;
                        color: string;
                        fontSize: string;
                        hover: {
                            backgroundColor: string;
                        };
                    }, {
                        backgroundColor: string;
                        color: string;
                        fontSize: string;
                        hover: {
                            backgroundColor: string;
                        };
                    }>;
                }, "strip", ZodTypeAny, {
                    start: {
                        backgroundColor: string;
                        color: string;
                        fontSize: string;
                        hover: {
                            backgroundColor: string;
                        };
                    };
                    next: {
                        backgroundColor: string;
                        color: string;
                        fontSize: string;
                        hover: {
                            backgroundColor: string;
                        };
                    };
                }, {
                    start: {
                        backgroundColor: string;
                        color: string;
                        fontSize: string;
                        hover: {
                            backgroundColor: string;
                        };
                    };
                    next: {
                        backgroundColor: string;
                        color: string;
                        fontSize: string;
                        hover: {
                            backgroundColor: string;
                        };
                    };
                }>;
            }, "strip", ZodTypeAny, {
                title: {
                    color: string;
                    fontSize: string;
                };
                subtitle: {
                    color: string;
                    fontSize: string;
                };
                action: {
                    start: {
                        backgroundColor: string;
                        color: string;
                        fontSize: string;
                        hover: {
                            backgroundColor: string;
                        };
                    };
                    next: {
                        backgroundColor: string;
                        color: string;
                        fontSize: string;
                        hover: {
                            backgroundColor: string;
                        };
                    };
                };
                frameContainer: {
                    backgroundColor: string;
                };
                figcaption: {
                    color: string;
                    fontSize: string;
                };
            }, {
                title: {
                    color: string;
                    fontSize: string;
                };
                subtitle: {
                    color: string;
                    fontSize: string;
                };
                action: {
                    start: {
                        backgroundColor: string;
                        color: string;
                        fontSize: string;
                        hover: {
                            backgroundColor: string;
                        };
                    };
                    next: {
                        backgroundColor: string;
                        color: string;
                        fontSize: string;
                        hover: {
                            backgroundColor: string;
                        };
                    };
                };
                frameContainer: {
                    backgroundColor: string;
                };
                figcaption: {
                    color: string;
                    fontSize: string;
                };
            }>;
            Verification: ZodObject<{
                frameContainer: ZodObject<{
                    backgroundColor: ZodString;
                }, "strip", ZodTypeAny, {
                    backgroundColor: string;
                }, {
                    backgroundColor: string;
                }>;
                title: ZodObject<{
                    color: ZodString;
                    fontSize: ZodString;
                }, "strip", ZodTypeAny, {
                    color: string;
                    fontSize: string;
                }, {
                    color: string;
                    fontSize: string;
                }>;
                camera: ZodObject<{
                    initial: ZodObject<{
                        borderColor: ZodString;
                    }, "strip", ZodTypeAny, {
                        borderColor: string;
                    }, {
                        borderColor: string;
                    }>;
                    undetected: ZodObject<{
                        borderColor: ZodString;
                    }, "strip", ZodTypeAny, {
                        borderColor: string;
                    }, {
                        borderColor: string;
                    }>;
                    detected: ZodObject<{
                        borderColor: ZodString;
                    }, "strip", ZodTypeAny, {
                        borderColor: string;
                    }, {
                        borderColor: string;
                    }>;
                }, "strip", ZodTypeAny, {
                    initial: {
                        borderColor: string;
                    };
                    undetected: {
                        borderColor: string;
                    };
                    detected: {
                        borderColor: string;
                    };
                }, {
                    initial: {
                        borderColor: string;
                    };
                    undetected: {
                        borderColor: string;
                    };
                    detected: {
                        borderColor: string;
                    };
                }>;
                instruction: ZodObject<{
                    backgroundColor: ZodString;
                    color: ZodString;
                    fontSize: ZodString;
                }, "strip", ZodTypeAny, {
                    backgroundColor: string;
                    color: string;
                    fontSize: string;
                }, {
                    backgroundColor: string;
                    color: string;
                    fontSize: string;
                }>;
            }, "strip", ZodTypeAny, {
                title: {
                    color: string;
                    fontSize: string;
                };
                instruction: {
                    backgroundColor: string;
                    color: string;
                    fontSize: string;
                };
                frameContainer: {
                    backgroundColor: string;
                };
                camera: {
                    initial: {
                        borderColor: string;
                    };
                    undetected: {
                        borderColor: string;
                    };
                    detected: {
                        borderColor: string;
                    };
                };
            }, {
                title: {
                    color: string;
                    fontSize: string;
                };
                instruction: {
                    backgroundColor: string;
                    color: string;
                    fontSize: string;
                };
                frameContainer: {
                    backgroundColor: string;
                };
                camera: {
                    initial: {
                        borderColor: string;
                    };
                    undetected: {
                        borderColor: string;
                    };
                    detected: {
                        borderColor: string;
                    };
                };
            }>;
            Result: ZodObject<{
                frameContainer: ZodObject<{
                    backgroundColor: ZodString;
                }, "strip", ZodTypeAny, {
                    backgroundColor: string;
                }, {
                    backgroundColor: string;
                }>;
                description: ZodObject<{
                    color: ZodString;
                    fontSize: ZodString;
                }, "strip", ZodTypeAny, {
                    color: string;
                    fontSize: string;
                }, {
                    color: string;
                    fontSize: string;
                }>;
            }, "strip", ZodTypeAny, {
                description: {
                    color: string;
                    fontSize: string;
                };
                frameContainer: {
                    backgroundColor: string;
                };
            }, {
                description: {
                    color: string;
                    fontSize: string;
                };
                frameContainer: {
                    backgroundColor: string;
                };
            }>;
            Shared: ZodObject<{
                background: ZodObject<{
                    backgroundColor: ZodString;
                    backgroundImage: ZodString;
                    backgroundSize: ZodString;
                }, "strip", ZodTypeAny, {
                    backgroundColor: string;
                    backgroundImage: string;
                    backgroundSize: string;
                }, {
                    backgroundColor: string;
                    backgroundImage: string;
                    backgroundSize: string;
                }>;
            }, "strip", ZodTypeAny, {
                background: {
                    backgroundColor: string;
                    backgroundImage: string;
                    backgroundSize: string;
                };
            }, {
                background: {
                    backgroundColor: string;
                    backgroundImage: string;
                    backgroundSize: string;
                };
            }>;
        }, "strip", ZodTypeAny, {
            Instruction: {
                title: {
                    color: string;
                    fontSize: string;
                };
                subtitle: {
                    color: string;
                    fontSize: string;
                };
                action: {
                    start: {
                        backgroundColor: string;
                        color: string;
                        fontSize: string;
                        hover: {
                            backgroundColor: string;
                        };
                    };
                    next: {
                        backgroundColor: string;
                        color: string;
                        fontSize: string;
                        hover: {
                            backgroundColor: string;
                        };
                    };
                };
                frameContainer: {
                    backgroundColor: string;
                };
                figcaption: {
                    color: string;
                    fontSize: string;
                };
            };
            Verification: {
                title: {
                    color: string;
                    fontSize: string;
                };
                instruction: {
                    backgroundColor: string;
                    color: string;
                    fontSize: string;
                };
                frameContainer: {
                    backgroundColor: string;
                };
                camera: {
                    initial: {
                        borderColor: string;
                    };
                    undetected: {
                        borderColor: string;
                    };
                    detected: {
                        borderColor: string;
                    };
                };
            };
            Result: {
                description: {
                    color: string;
                    fontSize: string;
                };
                frameContainer: {
                    backgroundColor: string;
                };
            };
            Shared: {
                background: {
                    backgroundColor: string;
                    backgroundImage: string;
                    backgroundSize: string;
                };
            };
        }, {
            Instruction: {
                title: {
                    color: string;
                    fontSize: string;
                };
                subtitle: {
                    color: string;
                    fontSize: string;
                };
                action: {
                    start: {
                        backgroundColor: string;
                        color: string;
                        fontSize: string;
                        hover: {
                            backgroundColor: string;
                        };
                    };
                    next: {
                        backgroundColor: string;
                        color: string;
                        fontSize: string;
                        hover: {
                            backgroundColor: string;
                        };
                    };
                };
                frameContainer: {
                    backgroundColor: string;
                };
                figcaption: {
                    color: string;
                    fontSize: string;
                };
            };
            Verification: {
                title: {
                    color: string;
                    fontSize: string;
                };
                instruction: {
                    backgroundColor: string;
                    color: string;
                    fontSize: string;
                };
                frameContainer: {
                    backgroundColor: string;
                };
                camera: {
                    initial: {
                        borderColor: string;
                    };
                    undetected: {
                        borderColor: string;
                    };
                    detected: {
                        borderColor: string;
                    };
                };
            };
            Result: {
                description: {
                    color: string;
                    fontSize: string;
                };
                frameContainer: {
                    backgroundColor: string;
                };
            };
            Shared: {
                background: {
                    backgroundColor: string;
                    backgroundImage: string;
                    backgroundSize: string;
                };
            };
        }>;
        Palette: ZodObject<{
            primary: ZodObject<{
                contrastText: ZodString;
                default: ZodString;
                LIGHT: ZodString;
                DARK: ZodString;
            }, "strip", ZodTypeAny, {
                contrastText: string;
                default: string;
                LIGHT: string;
                DARK: string;
            }, {
                contrastText: string;
                default: string;
                LIGHT: string;
                DARK: string;
            }>;
            secondary: ZodObject<{
                contrastText: ZodString;
                default: ZodString;
                LIGHT: ZodString;
                DARK: ZodString;
            }, "strip", ZodTypeAny, {
                contrastText: string;
                default: string;
                LIGHT: string;
                DARK: string;
            }, {
                contrastText: string;
                default: string;
                LIGHT: string;
                DARK: string;
            }>;
        }, "strip", ZodTypeAny, {
            primary: {
                contrastText: string;
                default: string;
                LIGHT: string;
                DARK: string;
            };
            secondary: {
                contrastText: string;
                default: string;
                LIGHT: string;
                DARK: string;
            };
        }, {
            primary: {
                contrastText: string;
                default: string;
                LIGHT: string;
                DARK: string;
            };
            secondary: {
                contrastText: string;
                default: string;
                LIGHT: string;
                DARK: string;
            };
        }>;
        Typography: ZodObject<{
            fontFamily: ZodArray<ZodString, "many">;
            fontSize: ZodObject<{
                title: ZodString;
                body: ZodString;
                caption: ZodString;
                button: ZodString;
            }, "strip", ZodTypeAny, {
                title: string;
                caption: string;
                body: string;
                button: string;
            }, {
                title: string;
                caption: string;
                body: string;
                button: string;
            }>;
        }, "strip", ZodTypeAny, {
            fontSize: {
                title: string;
                caption: string;
                body: string;
                button: string;
            };
            fontFamily: string[];
        }, {
            fontSize: {
                title: string;
                caption: string;
                body: string;
                button: string;
            };
            fontFamily: string[];
        }>;
        VendorPlaceholder: ZodBoolean;
    }, "strip", ZodTypeAny, {
        Component: {
            Instruction: {
                title: {
                    color: string;
                    fontSize: string;
                };
                subtitle: {
                    color: string;
                    fontSize: string;
                };
                action: {
                    start: {
                        backgroundColor: string;
                        color: string;
                        fontSize: string;
                        hover: {
                            backgroundColor: string;
                        };
                    };
                    next: {
                        backgroundColor: string;
                        color: string;
                        fontSize: string;
                        hover: {
                            backgroundColor: string;
                        };
                    };
                };
                frameContainer: {
                    backgroundColor: string;
                };
                figcaption: {
                    color: string;
                    fontSize: string;
                };
            };
            Verification: {
                title: {
                    color: string;
                    fontSize: string;
                };
                instruction: {
                    backgroundColor: string;
                    color: string;
                    fontSize: string;
                };
                frameContainer: {
                    backgroundColor: string;
                };
                camera: {
                    initial: {
                        borderColor: string;
                    };
                    undetected: {
                        borderColor: string;
                    };
                    detected: {
                        borderColor: string;
                    };
                };
            };
            Result: {
                description: {
                    color: string;
                    fontSize: string;
                };
                frameContainer: {
                    backgroundColor: string;
                };
            };
            Shared: {
                background: {
                    backgroundColor: string;
                    backgroundImage: string;
                    backgroundSize: string;
                };
            };
        };
        Palette: {
            primary: {
                contrastText: string;
                default: string;
                LIGHT: string;
                DARK: string;
            };
            secondary: {
                contrastText: string;
                default: string;
                LIGHT: string;
                DARK: string;
            };
        };
        Typography: {
            fontSize: {
                title: string;
                caption: string;
                body: string;
                button: string;
            };
            fontFamily: string[];
        };
        VendorPlaceholder: boolean;
    }, {
        Component: {
            Instruction: {
                title: {
                    color: string;
                    fontSize: string;
                };
                subtitle: {
                    color: string;
                    fontSize: string;
                };
                action: {
                    start: {
                        backgroundColor: string;
                        color: string;
                        fontSize: string;
                        hover: {
                            backgroundColor: string;
                        };
                    };
                    next: {
                        backgroundColor: string;
                        color: string;
                        fontSize: string;
                        hover: {
                            backgroundColor: string;
                        };
                    };
                };
                frameContainer: {
                    backgroundColor: string;
                };
                figcaption: {
                    color: string;
                    fontSize: string;
                };
            };
            Verification: {
                title: {
                    color: string;
                    fontSize: string;
                };
                instruction: {
                    backgroundColor: string;
                    color: string;
                    fontSize: string;
                };
                frameContainer: {
                    backgroundColor: string;
                };
                camera: {
                    initial: {
                        borderColor: string;
                    };
                    undetected: {
                        borderColor: string;
                    };
                    detected: {
                        borderColor: string;
                    };
                };
            };
            Result: {
                description: {
                    color: string;
                    fontSize: string;
                };
                frameContainer: {
                    backgroundColor: string;
                };
            };
            Shared: {
                background: {
                    backgroundColor: string;
                    backgroundImage: string;
                    backgroundSize: string;
                };
            };
        };
        Palette: {
            primary: {
                contrastText: string;
                default: string;
                LIGHT: string;
                DARK: string;
            };
            secondary: {
                contrastText: string;
                default: string;
                LIGHT: string;
                DARK: string;
            };
        };
        Typography: {
            fontSize: {
                title: string;
                caption: string;
                body: string;
                button: string;
            };
            fontFamily: string[];
        };
        VendorPlaceholder: boolean;
    }>;
    url: ZodString;
    verbose: ZodBoolean;
}, {
    content: ZodObject<{
        Instruction: ZodOptional<ZodObject<{
            title: ZodOptional<ZodString>;
            subtitle: ZodOptional<ZodString>;
            instructions: ZodOptional<ZodArray<ZodObject<{
                caption: ZodOptional<ZodString>;
                image: ZodOptional<ZodString>;
            }, "strip", ZodTypeAny, {
                caption?: string | undefined;
                image?: string | undefined;
            }, {
                caption?: string | undefined;
                image?: string | undefined;
            }>, "many">>;
            action: ZodOptional<ZodObject<{
                backIcon: ZodOptional<ZodString>;
                start: ZodOptional<ZodString>;
                next: ZodOptional<ZodString>;
            }, "strip", ZodTypeAny, {
                backIcon?: string | undefined;
                start?: string | undefined;
                next?: string | undefined;
            }, {
                backIcon?: string | undefined;
                start?: string | undefined;
                next?: string | undefined;
            }>>;
        }, "strip", ZodTypeAny, {
            title?: string | undefined;
            subtitle?: string | undefined;
            instructions?: {
                caption?: string | undefined;
                image?: string | undefined;
            }[] | undefined;
            action?: {
                backIcon?: string | undefined;
                start?: string | undefined;
                next?: string | undefined;
            } | undefined;
        }, {
            title?: string | undefined;
            subtitle?: string | undefined;
            instructions?: {
                caption?: string | undefined;
                image?: string | undefined;
            }[] | undefined;
            action?: {
                backIcon?: string | undefined;
                start?: string | undefined;
                next?: string | undefined;
            } | undefined;
        }>>;
        Verification: ZodOptional<ZodObject<{
            title: ZodOptional<ZodString>;
            action: ZodOptional<ZodObject<{
                backIcon: ZodOptional<ZodString>;
            }, "strip", ZodTypeAny, {
                backIcon?: string | undefined;
            }, {
                backIcon?: string | undefined;
            }>>;
            instruction: ZodOptional<ZodObject<{
                loading: ZodOptional<ZodObject<{
                    caption: ZodOptional<ZodString>;
                    image: ZodOptional<ZodString>;
                    sound: ZodOptional<ZodString>;
                }, "strip", ZodTypeAny, {
                    caption?: string | undefined;
                    image?: string | undefined;
                    sound?: string | undefined;
                }, {
                    caption?: string | undefined;
                    image?: string | undefined;
                    sound?: string | undefined;
                }>>;
                processing: ZodOptional<ZodObject<{
                    caption: ZodOptional<ZodString>;
                    image: ZodOptional<ZodString>;
                    sound: ZodOptional<ZodString>;
                }, "strip", ZodTypeAny, {
                    caption?: string | undefined;
                    image?: string | undefined;
                    sound?: string | undefined;
                }, {
                    caption?: string | undefined;
                    image?: string | undefined;
                    sound?: string | undefined;
                }>>;
            }, "strip", ZodTypeAny, {
                loading?: {
                    caption?: string | undefined;
                    image?: string | undefined;
                    sound?: string | undefined;
                } | undefined;
                processing?: {
                    caption?: string | undefined;
                    image?: string | undefined;
                    sound?: string | undefined;
                } | undefined;
            }, {
                loading?: {
                    caption?: string | undefined;
                    image?: string | undefined;
                    sound?: string | undefined;
                } | undefined;
                processing?: {
                    caption?: string | undefined;
                    image?: string | undefined;
                    sound?: string | undefined;
                } | undefined;
            }>>;
        }, "strip", ZodTypeAny, {
            title?: string | undefined;
            action?: {
                backIcon?: string | undefined;
            } | undefined;
            instruction?: {
                loading?: {
                    caption?: string | undefined;
                    image?: string | undefined;
                    sound?: string | undefined;
                } | undefined;
                processing?: {
                    caption?: string | undefined;
                    image?: string | undefined;
                    sound?: string | undefined;
                } | undefined;
            } | undefined;
        }, {
            title?: string | undefined;
            action?: {
                backIcon?: string | undefined;
            } | undefined;
            instruction?: {
                loading?: {
                    caption?: string | undefined;
                    image?: string | undefined;
                    sound?: string | undefined;
                } | undefined;
                processing?: {
                    caption?: string | undefined;
                    image?: string | undefined;
                    sound?: string | undefined;
                } | undefined;
            } | undefined;
        }>>;
        Result: ZodOptional<ZodObject<{
            icon: ZodOptional<ZodString>;
            description: ZodOptional<ZodString>;
        }, "strip", ZodTypeAny, {
            icon?: string | undefined;
            description?: string | undefined;
        }, {
            icon?: string | undefined;
            description?: string | undefined;
        }>>;
    }, "strip", ZodTypeAny, {
        Instruction?: {
            title?: string | undefined;
            subtitle?: string | undefined;
            instructions?: {
                caption?: string | undefined;
                image?: string | undefined;
            }[] | undefined;
            action?: {
                backIcon?: string | undefined;
                start?: string | undefined;
                next?: string | undefined;
            } | undefined;
        } | undefined;
        Verification?: {
            title?: string | undefined;
            action?: {
                backIcon?: string | undefined;
            } | undefined;
            instruction?: {
                loading?: {
                    caption?: string | undefined;
                    image?: string | undefined;
                    sound?: string | undefined;
                } | undefined;
                processing?: {
                    caption?: string | undefined;
                    image?: string | undefined;
                    sound?: string | undefined;
                } | undefined;
            } | undefined;
        } | undefined;
        Result?: {
            icon?: string | undefined;
            description?: string | undefined;
        } | undefined;
    }, {
        Instruction?: {
            title?: string | undefined;
            subtitle?: string | undefined;
            instructions?: {
                caption?: string | undefined;
                image?: string | undefined;
            }[] | undefined;
            action?: {
                backIcon?: string | undefined;
                start?: string | undefined;
                next?: string | undefined;
            } | undefined;
        } | undefined;
        Verification?: {
            title?: string | undefined;
            action?: {
                backIcon?: string | undefined;
            } | undefined;
            instruction?: {
                loading?: {
                    caption?: string | undefined;
                    image?: string | undefined;
                    sound?: string | undefined;
                } | undefined;
                processing?: {
                    caption?: string | undefined;
                    image?: string | undefined;
                    sound?: string | undefined;
                } | undefined;
            } | undefined;
        } | undefined;
        Result?: {
            icon?: string | undefined;
            description?: string | undefined;
        } | undefined;
    }>;
    theme: ZodObject<{
        Component: ZodOptional<ZodObject<{
            Instruction: ZodOptional<ZodObject<{
                frameContainer: ZodOptional<ZodObject<{
                    backgroundColor: ZodOptional<ZodString>;
                }, "strip", ZodTypeAny, {
                    backgroundColor?: string | undefined;
                }, {
                    backgroundColor?: string | undefined;
                }>>;
                title: ZodOptional<ZodObject<{
                    color: ZodOptional<ZodString>;
                    fontSize: ZodOptional<ZodString>;
                }, "strip", ZodTypeAny, {
                    color?: string | undefined;
                    fontSize?: string | undefined;
                }, {
                    color?: string | undefined;
                    fontSize?: string | undefined;
                }>>;
                subtitle: ZodOptional<ZodObject<{
                    color: ZodOptional<ZodString>;
                    fontSize: ZodOptional<ZodString>;
                }, "strip", ZodTypeAny, {
                    color?: string | undefined;
                    fontSize?: string | undefined;
                }, {
                    color?: string | undefined;
                    fontSize?: string | undefined;
                }>>;
                figcaption: ZodOptional<ZodObject<{
                    color: ZodOptional<ZodString>;
                    fontSize: ZodOptional<ZodString>;
                }, "strip", ZodTypeAny, {
                    color?: string | undefined;
                    fontSize?: string | undefined;
                }, {
                    color?: string | undefined;
                    fontSize?: string | undefined;
                }>>;
                action: ZodOptional<ZodObject<{
                    start: ZodOptional<ZodObject<{
                        color: ZodOptional<ZodString>;
                        fontSize: ZodOptional<ZodString>;
                        backgroundColor: ZodOptional<ZodString>;
                        hover: ZodOptional<ZodObject<{
                            backgroundColor: ZodOptional<ZodString>;
                        }, "strip", ZodTypeAny, {
                            backgroundColor?: string | undefined;
                        }, {
                            backgroundColor?: string | undefined;
                        }>>;
                    }, "strip", ZodTypeAny, {
                        backgroundColor?: string | undefined;
                        color?: string | undefined;
                        fontSize?: string | undefined;
                        hover?: {
                            backgroundColor?: string | undefined;
                        } | undefined;
                    }, {
                        backgroundColor?: string | undefined;
                        color?: string | undefined;
                        fontSize?: string | undefined;
                        hover?: {
                            backgroundColor?: string | undefined;
                        } | undefined;
                    }>>;
                    next: ZodOptional<ZodObject<{
                        color: ZodOptional<ZodString>;
                        fontSize: ZodOptional<ZodString>;
                        backgroundColor: ZodOptional<ZodString>;
                        hover: ZodOptional<ZodObject<{
                            backgroundColor: ZodOptional<ZodString>;
                        }, "strip", ZodTypeAny, {
                            backgroundColor?: string | undefined;
                        }, {
                            backgroundColor?: string | undefined;
                        }>>;
                    }, "strip", ZodTypeAny, {
                        backgroundColor?: string | undefined;
                        color?: string | undefined;
                        fontSize?: string | undefined;
                        hover?: {
                            backgroundColor?: string | undefined;
                        } | undefined;
                    }, {
                        backgroundColor?: string | undefined;
                        color?: string | undefined;
                        fontSize?: string | undefined;
                        hover?: {
                            backgroundColor?: string | undefined;
                        } | undefined;
                    }>>;
                }, "strip", ZodTypeAny, {
                    start?: {
                        backgroundColor?: string | undefined;
                        color?: string | undefined;
                        fontSize?: string | undefined;
                        hover?: {
                            backgroundColor?: string | undefined;
                        } | undefined;
                    } | undefined;
                    next?: {
                        backgroundColor?: string | undefined;
                        color?: string | undefined;
                        fontSize?: string | undefined;
                        hover?: {
                            backgroundColor?: string | undefined;
                        } | undefined;
                    } | undefined;
                }, {
                    start?: {
                        backgroundColor?: string | undefined;
                        color?: string | undefined;
                        fontSize?: string | undefined;
                        hover?: {
                            backgroundColor?: string | undefined;
                        } | undefined;
                    } | undefined;
                    next?: {
                        backgroundColor?: string | undefined;
                        color?: string | undefined;
                        fontSize?: string | undefined;
                        hover?: {
                            backgroundColor?: string | undefined;
                        } | undefined;
                    } | undefined;
                }>>;
            }, "strip", ZodTypeAny, {
                title?: {
                    color?: string | undefined;
                    fontSize?: string | undefined;
                } | undefined;
                subtitle?: {
                    color?: string | undefined;
                    fontSize?: string | undefined;
                } | undefined;
                action?: {
                    start?: {
                        backgroundColor?: string | undefined;
                        color?: string | undefined;
                        fontSize?: string | undefined;
                        hover?: {
                            backgroundColor?: string | undefined;
                        } | undefined;
                    } | undefined;
                    next?: {
                        backgroundColor?: string | undefined;
                        color?: string | undefined;
                        fontSize?: string | undefined;
                        hover?: {
                            backgroundColor?: string | undefined;
                        } | undefined;
                    } | undefined;
                } | undefined;
                frameContainer?: {
                    backgroundColor?: string | undefined;
                } | undefined;
                figcaption?: {
                    color?: string | undefined;
                    fontSize?: string | undefined;
                } | undefined;
            }, {
                title?: {
                    color?: string | undefined;
                    fontSize?: string | undefined;
                } | undefined;
                subtitle?: {
                    color?: string | undefined;
                    fontSize?: string | undefined;
                } | undefined;
                action?: {
                    start?: {
                        backgroundColor?: string | undefined;
                        color?: string | undefined;
                        fontSize?: string | undefined;
                        hover?: {
                            backgroundColor?: string | undefined;
                        } | undefined;
                    } | undefined;
                    next?: {
                        backgroundColor?: string | undefined;
                        color?: string | undefined;
                        fontSize?: string | undefined;
                        hover?: {
                            backgroundColor?: string | undefined;
                        } | undefined;
                    } | undefined;
                } | undefined;
                frameContainer?: {
                    backgroundColor?: string | undefined;
                } | undefined;
                figcaption?: {
                    color?: string | undefined;
                    fontSize?: string | undefined;
                } | undefined;
            }>>;
            Verification: ZodOptional<ZodObject<{
                frameContainer: ZodOptional<ZodObject<{
                    backgroundColor: ZodOptional<ZodString>;
                }, "strip", ZodTypeAny, {
                    backgroundColor?: string | undefined;
                }, {
                    backgroundColor?: string | undefined;
                }>>;
                title: ZodOptional<ZodObject<{
                    color: ZodOptional<ZodString>;
                    fontSize: ZodOptional<ZodString>;
                }, "strip", ZodTypeAny, {
                    color?: string | undefined;
                    fontSize?: string | undefined;
                }, {
                    color?: string | undefined;
                    fontSize?: string | undefined;
                }>>;
                camera: ZodOptional<ZodObject<{
                    initial: ZodOptional<ZodObject<{
                        borderColor: ZodOptional<ZodString>;
                    }, "strip", ZodTypeAny, {
                        borderColor?: string | undefined;
                    }, {
                        borderColor?: string | undefined;
                    }>>;
                    undetected: ZodOptional<ZodObject<{
                        borderColor: ZodOptional<ZodString>;
                    }, "strip", ZodTypeAny, {
                        borderColor?: string | undefined;
                    }, {
                        borderColor?: string | undefined;
                    }>>;
                    detected: ZodOptional<ZodObject<{
                        borderColor: ZodOptional<ZodString>;
                    }, "strip", ZodTypeAny, {
                        borderColor?: string | undefined;
                    }, {
                        borderColor?: string | undefined;
                    }>>;
                }, "strip", ZodTypeAny, {
                    initial?: {
                        borderColor?: string | undefined;
                    } | undefined;
                    undetected?: {
                        borderColor?: string | undefined;
                    } | undefined;
                    detected?: {
                        borderColor?: string | undefined;
                    } | undefined;
                }, {
                    initial?: {
                        borderColor?: string | undefined;
                    } | undefined;
                    undetected?: {
                        borderColor?: string | undefined;
                    } | undefined;
                    detected?: {
                        borderColor?: string | undefined;
                    } | undefined;
                }>>;
                instruction: ZodOptional<ZodObject<{
                    backgroundColor: ZodOptional<ZodString>;
                    color: ZodOptional<ZodString>;
                    fontSize: ZodOptional<ZodString>;
                }, "strip", ZodTypeAny, {
                    backgroundColor?: string | undefined;
                    color?: string | undefined;
                    fontSize?: string | undefined;
                }, {
                    backgroundColor?: string | undefined;
                    color?: string | undefined;
                    fontSize?: string | undefined;
                }>>;
            }, "strip", ZodTypeAny, {
                title?: {
                    color?: string | undefined;
                    fontSize?: string | undefined;
                } | undefined;
                instruction?: {
                    backgroundColor?: string | undefined;
                    color?: string | undefined;
                    fontSize?: string | undefined;
                } | undefined;
                frameContainer?: {
                    backgroundColor?: string | undefined;
                } | undefined;
                camera?: {
                    initial?: {
                        borderColor?: string | undefined;
                    } | undefined;
                    undetected?: {
                        borderColor?: string | undefined;
                    } | undefined;
                    detected?: {
                        borderColor?: string | undefined;
                    } | undefined;
                } | undefined;
            }, {
                title?: {
                    color?: string | undefined;
                    fontSize?: string | undefined;
                } | undefined;
                instruction?: {
                    backgroundColor?: string | undefined;
                    color?: string | undefined;
                    fontSize?: string | undefined;
                } | undefined;
                frameContainer?: {
                    backgroundColor?: string | undefined;
                } | undefined;
                camera?: {
                    initial?: {
                        borderColor?: string | undefined;
                    } | undefined;
                    undetected?: {
                        borderColor?: string | undefined;
                    } | undefined;
                    detected?: {
                        borderColor?: string | undefined;
                    } | undefined;
                } | undefined;
            }>>;
            Result: ZodOptional<ZodObject<{
                frameContainer: ZodOptional<ZodObject<{
                    backgroundColor: ZodOptional<ZodString>;
                }, "strip", ZodTypeAny, {
                    backgroundColor?: string | undefined;
                }, {
                    backgroundColor?: string | undefined;
                }>>;
                description: ZodOptional<ZodObject<{
                    color: ZodOptional<ZodString>;
                    fontSize: ZodOptional<ZodString>;
                }, "strip", ZodTypeAny, {
                    color?: string | undefined;
                    fontSize?: string | undefined;
                }, {
                    color?: string | undefined;
                    fontSize?: string | undefined;
                }>>;
            }, "strip", ZodTypeAny, {
                description?: {
                    color?: string | undefined;
                    fontSize?: string | undefined;
                } | undefined;
                frameContainer?: {
                    backgroundColor?: string | undefined;
                } | undefined;
            }, {
                description?: {
                    color?: string | undefined;
                    fontSize?: string | undefined;
                } | undefined;
                frameContainer?: {
                    backgroundColor?: string | undefined;
                } | undefined;
            }>>;
            Shared: ZodOptional<ZodObject<{
                background: ZodOptional<ZodObject<{
                    backgroundColor: ZodOptional<ZodString>;
                    backgroundImage: ZodOptional<ZodString>;
                    backgroundSize: ZodOptional<ZodString>;
                }, "strip", ZodTypeAny, {
                    backgroundColor?: string | undefined;
                    backgroundImage?: string | undefined;
                    backgroundSize?: string | undefined;
                }, {
                    backgroundColor?: string | undefined;
                    backgroundImage?: string | undefined;
                    backgroundSize?: string | undefined;
                }>>;
            }, "strip", ZodTypeAny, {
                background?: {
                    backgroundColor?: string | undefined;
                    backgroundImage?: string | undefined;
                    backgroundSize?: string | undefined;
                } | undefined;
            }, {
                background?: {
                    backgroundColor?: string | undefined;
                    backgroundImage?: string | undefined;
                    backgroundSize?: string | undefined;
                } | undefined;
            }>>;
        }, "strip", ZodTypeAny, {
            Instruction?: {
                title?: {
                    color?: string | undefined;
                    fontSize?: string | undefined;
                } | undefined;
                subtitle?: {
                    color?: string | undefined;
                    fontSize?: string | undefined;
                } | undefined;
                action?: {
                    start?: {
                        backgroundColor?: string | undefined;
                        color?: string | undefined;
                        fontSize?: string | undefined;
                        hover?: {
                            backgroundColor?: string | undefined;
                        } | undefined;
                    } | undefined;
                    next?: {
                        backgroundColor?: string | undefined;
                        color?: string | undefined;
                        fontSize?: string | undefined;
                        hover?: {
                            backgroundColor?: string | undefined;
                        } | undefined;
                    } | undefined;
                } | undefined;
                frameContainer?: {
                    backgroundColor?: string | undefined;
                } | undefined;
                figcaption?: {
                    color?: string | undefined;
                    fontSize?: string | undefined;
                } | undefined;
            } | undefined;
            Verification?: {
                title?: {
                    color?: string | undefined;
                    fontSize?: string | undefined;
                } | undefined;
                instruction?: {
                    backgroundColor?: string | undefined;
                    color?: string | undefined;
                    fontSize?: string | undefined;
                } | undefined;
                frameContainer?: {
                    backgroundColor?: string | undefined;
                } | undefined;
                camera?: {
                    initial?: {
                        borderColor?: string | undefined;
                    } | undefined;
                    undetected?: {
                        borderColor?: string | undefined;
                    } | undefined;
                    detected?: {
                        borderColor?: string | undefined;
                    } | undefined;
                } | undefined;
            } | undefined;
            Result?: {
                description?: {
                    color?: string | undefined;
                    fontSize?: string | undefined;
                } | undefined;
                frameContainer?: {
                    backgroundColor?: string | undefined;
                } | undefined;
            } | undefined;
            Shared?: {
                background?: {
                    backgroundColor?: string | undefined;
                    backgroundImage?: string | undefined;
                    backgroundSize?: string | undefined;
                } | undefined;
            } | undefined;
        }, {
            Instruction?: {
                title?: {
                    color?: string | undefined;
                    fontSize?: string | undefined;
                } | undefined;
                subtitle?: {
                    color?: string | undefined;
                    fontSize?: string | undefined;
                } | undefined;
                action?: {
                    start?: {
                        backgroundColor?: string | undefined;
                        color?: string | undefined;
                        fontSize?: string | undefined;
                        hover?: {
                            backgroundColor?: string | undefined;
                        } | undefined;
                    } | undefined;
                    next?: {
                        backgroundColor?: string | undefined;
                        color?: string | undefined;
                        fontSize?: string | undefined;
                        hover?: {
                            backgroundColor?: string | undefined;
                        } | undefined;
                    } | undefined;
                } | undefined;
                frameContainer?: {
                    backgroundColor?: string | undefined;
                } | undefined;
                figcaption?: {
                    color?: string | undefined;
                    fontSize?: string | undefined;
                } | undefined;
            } | undefined;
            Verification?: {
                title?: {
                    color?: string | undefined;
                    fontSize?: string | undefined;
                } | undefined;
                instruction?: {
                    backgroundColor?: string | undefined;
                    color?: string | undefined;
                    fontSize?: string | undefined;
                } | undefined;
                frameContainer?: {
                    backgroundColor?: string | undefined;
                } | undefined;
                camera?: {
                    initial?: {
                        borderColor?: string | undefined;
                    } | undefined;
                    undetected?: {
                        borderColor?: string | undefined;
                    } | undefined;
                    detected?: {
                        borderColor?: string | undefined;
                    } | undefined;
                } | undefined;
            } | undefined;
            Result?: {
                description?: {
                    color?: string | undefined;
                    fontSize?: string | undefined;
                } | undefined;
                frameContainer?: {
                    backgroundColor?: string | undefined;
                } | undefined;
            } | undefined;
            Shared?: {
                background?: {
                    backgroundColor?: string | undefined;
                    backgroundImage?: string | undefined;
                    backgroundSize?: string | undefined;
                } | undefined;
            } | undefined;
        }>>;
        Palette: ZodOptional<ZodObject<{
            primary: ZodOptional<ZodObject<{
                contrastText: ZodOptional<ZodString>;
                default: ZodOptional<ZodString>;
                LIGHT: ZodOptional<ZodString>;
                DARK: ZodOptional<ZodString>;
            }, "strip", ZodTypeAny, {
                contrastText?: string | undefined;
                default?: string | undefined;
                LIGHT?: string | undefined;
                DARK?: string | undefined;
            }, {
                contrastText?: string | undefined;
                default?: string | undefined;
                LIGHT?: string | undefined;
                DARK?: string | undefined;
            }>>;
            secondary: ZodOptional<ZodObject<{
                contrastText: ZodOptional<ZodString>;
                default: ZodOptional<ZodString>;
                LIGHT: ZodOptional<ZodString>;
                DARK: ZodOptional<ZodString>;
            }, "strip", ZodTypeAny, {
                contrastText?: string | undefined;
                default?: string | undefined;
                LIGHT?: string | undefined;
                DARK?: string | undefined;
            }, {
                contrastText?: string | undefined;
                default?: string | undefined;
                LIGHT?: string | undefined;
                DARK?: string | undefined;
            }>>;
        }, "strip", ZodTypeAny, {
            primary?: {
                contrastText?: string | undefined;
                default?: string | undefined;
                LIGHT?: string | undefined;
                DARK?: string | undefined;
            } | undefined;
            secondary?: {
                contrastText?: string | undefined;
                default?: string | undefined;
                LIGHT?: string | undefined;
                DARK?: string | undefined;
            } | undefined;
        }, {
            primary?: {
                contrastText?: string | undefined;
                default?: string | undefined;
                LIGHT?: string | undefined;
                DARK?: string | undefined;
            } | undefined;
            secondary?: {
                contrastText?: string | undefined;
                default?: string | undefined;
                LIGHT?: string | undefined;
                DARK?: string | undefined;
            } | undefined;
        }>>;
        Typography: ZodOptional<ZodObject<{
            fontFamily: ZodOptional<ZodArray<ZodString, "many">>;
            fontSize: ZodOptional<ZodObject<{
                title: ZodOptional<ZodString>;
                body: ZodOptional<ZodString>;
                caption: ZodOptional<ZodString>;
                button: ZodOptional<ZodString>;
            }, "strip", ZodTypeAny, {
                title?: string | undefined;
                caption?: string | undefined;
                body?: string | undefined;
                button?: string | undefined;
            }, {
                title?: string | undefined;
                caption?: string | undefined;
                body?: string | undefined;
                button?: string | undefined;
            }>>;
        }, "strip", ZodTypeAny, {
            fontSize?: {
                title?: string | undefined;
                caption?: string | undefined;
                body?: string | undefined;
                button?: string | undefined;
            } | undefined;
            fontFamily?: string[] | undefined;
        }, {
            fontSize?: {
                title?: string | undefined;
                caption?: string | undefined;
                body?: string | undefined;
                button?: string | undefined;
            } | undefined;
            fontFamily?: string[] | undefined;
        }>>;
        VendorPlaceholder: ZodOptional<ZodBoolean>;
    }, "strip", ZodTypeAny, {
        Component?: {
            Instruction?: {
                title?: {
                    color?: string | undefined;
                    fontSize?: string | undefined;
                } | undefined;
                subtitle?: {
                    color?: string | undefined;
                    fontSize?: string | undefined;
                } | undefined;
                action?: {
                    start?: {
                        backgroundColor?: string | undefined;
                        color?: string | undefined;
                        fontSize?: string | undefined;
                        hover?: {
                            backgroundColor?: string | undefined;
                        } | undefined;
                    } | undefined;
                    next?: {
                        backgroundColor?: string | undefined;
                        color?: string | undefined;
                        fontSize?: string | undefined;
                        hover?: {
                            backgroundColor?: string | undefined;
                        } | undefined;
                    } | undefined;
                } | undefined;
                frameContainer?: {
                    backgroundColor?: string | undefined;
                } | undefined;
                figcaption?: {
                    color?: string | undefined;
                    fontSize?: string | undefined;
                } | undefined;
            } | undefined;
            Verification?: {
                title?: {
                    color?: string | undefined;
                    fontSize?: string | undefined;
                } | undefined;
                instruction?: {
                    backgroundColor?: string | undefined;
                    color?: string | undefined;
                    fontSize?: string | undefined;
                } | undefined;
                frameContainer?: {
                    backgroundColor?: string | undefined;
                } | undefined;
                camera?: {
                    initial?: {
                        borderColor?: string | undefined;
                    } | undefined;
                    undetected?: {
                        borderColor?: string | undefined;
                    } | undefined;
                    detected?: {
                        borderColor?: string | undefined;
                    } | undefined;
                } | undefined;
            } | undefined;
            Result?: {
                description?: {
                    color?: string | undefined;
                    fontSize?: string | undefined;
                } | undefined;
                frameContainer?: {
                    backgroundColor?: string | undefined;
                } | undefined;
            } | undefined;
            Shared?: {
                background?: {
                    backgroundColor?: string | undefined;
                    backgroundImage?: string | undefined;
                    backgroundSize?: string | undefined;
                } | undefined;
            } | undefined;
        } | undefined;
        Palette?: {
            primary?: {
                contrastText?: string | undefined;
                default?: string | undefined;
                LIGHT?: string | undefined;
                DARK?: string | undefined;
            } | undefined;
            secondary?: {
                contrastText?: string | undefined;
                default?: string | undefined;
                LIGHT?: string | undefined;
                DARK?: string | undefined;
            } | undefined;
        } | undefined;
        Typography?: {
            fontSize?: {
                title?: string | undefined;
                caption?: string | undefined;
                body?: string | undefined;
                button?: string | undefined;
            } | undefined;
            fontFamily?: string[] | undefined;
        } | undefined;
        VendorPlaceholder?: boolean | undefined;
    }, {
        Component?: {
            Instruction?: {
                title?: {
                    color?: string | undefined;
                    fontSize?: string | undefined;
                } | undefined;
                subtitle?: {
                    color?: string | undefined;
                    fontSize?: string | undefined;
                } | undefined;
                action?: {
                    start?: {
                        backgroundColor?: string | undefined;
                        color?: string | undefined;
                        fontSize?: string | undefined;
                        hover?: {
                            backgroundColor?: string | undefined;
                        } | undefined;
                    } | undefined;
                    next?: {
                        backgroundColor?: string | undefined;
                        color?: string | undefined;
                        fontSize?: string | undefined;
                        hover?: {
                            backgroundColor?: string | undefined;
                        } | undefined;
                    } | undefined;
                } | undefined;
                frameContainer?: {
                    backgroundColor?: string | undefined;
                } | undefined;
                figcaption?: {
                    color?: string | undefined;
                    fontSize?: string | undefined;
                } | undefined;
            } | undefined;
            Verification?: {
                title?: {
                    color?: string | undefined;
                    fontSize?: string | undefined;
                } | undefined;
                instruction?: {
                    backgroundColor?: string | undefined;
                    color?: string | undefined;
                    fontSize?: string | undefined;
                } | undefined;
                frameContainer?: {
                    backgroundColor?: string | undefined;
                } | undefined;
                camera?: {
                    initial?: {
                        borderColor?: string | undefined;
                    } | undefined;
                    undetected?: {
                        borderColor?: string | undefined;
                    } | undefined;
                    detected?: {
                        borderColor?: string | undefined;
                    } | undefined;
                } | undefined;
            } | undefined;
            Result?: {
                description?: {
                    color?: string | undefined;
                    fontSize?: string | undefined;
                } | undefined;
                frameContainer?: {
                    backgroundColor?: string | undefined;
                } | undefined;
            } | undefined;
            Shared?: {
                background?: {
                    backgroundColor?: string | undefined;
                    backgroundImage?: string | undefined;
                    backgroundSize?: string | undefined;
                } | undefined;
            } | undefined;
        } | undefined;
        Palette?: {
            primary?: {
                contrastText?: string | undefined;
                default?: string | undefined;
                LIGHT?: string | undefined;
                DARK?: string | undefined;
            } | undefined;
            secondary?: {
                contrastText?: string | undefined;
                default?: string | undefined;
                LIGHT?: string | undefined;
                DARK?: string | undefined;
            } | undefined;
        } | undefined;
        Typography?: {
            fontSize?: {
                title?: string | undefined;
                caption?: string | undefined;
                body?: string | undefined;
                button?: string | undefined;
            } | undefined;
            fontFamily?: string[] | undefined;
        } | undefined;
        VendorPlaceholder?: boolean | undefined;
    }>;
}>, "strip", ZodTypeAny, {
    url: string;
    instruction: {
        commands: ("look_left" | "look_right" | "open_mouth" | "see_straight")[];
        seeds: ("look_left" | "look_right" | "open_mouth" | "see_straight")[];
        seedLimit: number;
        translator: Partial<Record<"look_left" | "look_right" | "open_mouth" | "see_straight", string>>;
        illustrator: Partial<Record<"look_left" | "look_right" | "open_mouth" | "see_straight", string>>;
        isShowInstruction: boolean;
        isSoundLooping: boolean;
        isUseSound: boolean;
        speaker: Partial<Record<"look_left" | "look_right" | "open_mouth" | "see_straight", string>>;
    };
    camera: {
        virtualLabel?: string[] | null | undefined;
    };
    credential: {
        clientId: string;
        secret: string;
    };
    disruptDuration: number;
    metadata: {
        CompressionAlgorithm: {
            dimension: [number, number];
            fileSizeThreshold: number;
            qualityThreshold?: number | undefined;
        };
        MagicNumber: number;
        ScreenOrientation: "auto" | "landscape" | "portrait";
        WaitingTime: number;
    };
    proxy: {
        License: {
            url: string;
            params?: Record<string, any> | undefined;
            headers?: Record<string, any> | undefined;
            metaparameter?: Record<string, any> | undefined;
        };
        PassiveLiveness: {
            url: string;
            params?: Record<string, any> | undefined;
            headers?: Record<string, any> | undefined;
            metaparameter?: Record<string, any> | undefined;
        };
        GenerateKey?: {
            url: string;
            params?: Record<string, any> | undefined;
            headers?: Record<string, any> | undefined;
            metaparameter?: Record<string, any> | undefined;
        } | undefined;
        Deepfake?: {
            url: string;
            params?: Record<string, any> | undefined;
            headers?: Record<string, any> | undefined;
            metaparameter?: Record<string, any> | undefined;
        } | undefined;
    };
    timeout: number;
    content: {
        Instruction?: {
            title?: string | undefined;
            subtitle?: string | undefined;
            instructions?: {
                caption?: string | undefined;
                image?: string | undefined;
            }[] | undefined;
            action?: {
                backIcon?: string | undefined;
                start?: string | undefined;
                next?: string | undefined;
            } | undefined;
        } | undefined;
        Verification?: {
            title?: string | undefined;
            action?: {
                backIcon?: string | undefined;
            } | undefined;
            instruction?: {
                loading?: {
                    caption?: string | undefined;
                    image?: string | undefined;
                    sound?: string | undefined;
                } | undefined;
                processing?: {
                    caption?: string | undefined;
                    image?: string | undefined;
                    sound?: string | undefined;
                } | undefined;
            } | undefined;
        } | undefined;
        Result?: {
            icon?: string | undefined;
            description?: string | undefined;
        } | undefined;
    };
    theme: {
        Component?: {
            Instruction?: {
                title?: {
                    color?: string | undefined;
                    fontSize?: string | undefined;
                } | undefined;
                subtitle?: {
                    color?: string | undefined;
                    fontSize?: string | undefined;
                } | undefined;
                action?: {
                    start?: {
                        backgroundColor?: string | undefined;
                        color?: string | undefined;
                        fontSize?: string | undefined;
                        hover?: {
                            backgroundColor?: string | undefined;
                        } | undefined;
                    } | undefined;
                    next?: {
                        backgroundColor?: string | undefined;
                        color?: string | undefined;
                        fontSize?: string | undefined;
                        hover?: {
                            backgroundColor?: string | undefined;
                        } | undefined;
                    } | undefined;
                } | undefined;
                frameContainer?: {
                    backgroundColor?: string | undefined;
                } | undefined;
                figcaption?: {
                    color?: string | undefined;
                    fontSize?: string | undefined;
                } | undefined;
            } | undefined;
            Verification?: {
                title?: {
                    color?: string | undefined;
                    fontSize?: string | undefined;
                } | undefined;
                instruction?: {
                    backgroundColor?: string | undefined;
                    color?: string | undefined;
                    fontSize?: string | undefined;
                } | undefined;
                frameContainer?: {
                    backgroundColor?: string | undefined;
                } | undefined;
                camera?: {
                    initial?: {
                        borderColor?: string | undefined;
                    } | undefined;
                    undetected?: {
                        borderColor?: string | undefined;
                    } | undefined;
                    detected?: {
                        borderColor?: string | undefined;
                    } | undefined;
                } | undefined;
            } | undefined;
            Result?: {
                description?: {
                    color?: string | undefined;
                    fontSize?: string | undefined;
                } | undefined;
                frameContainer?: {
                    backgroundColor?: string | undefined;
                } | undefined;
            } | undefined;
            Shared?: {
                background?: {
                    backgroundColor?: string | undefined;
                    backgroundImage?: string | undefined;
                    backgroundSize?: string | undefined;
                } | undefined;
            } | undefined;
        } | undefined;
        Palette?: {
            primary?: {
                contrastText?: string | undefined;
                default?: string | undefined;
                LIGHT?: string | undefined;
                DARK?: string | undefined;
            } | undefined;
            secondary?: {
                contrastText?: string | undefined;
                default?: string | undefined;
                LIGHT?: string | undefined;
                DARK?: string | undefined;
            } | undefined;
        } | undefined;
        Typography?: {
            fontSize?: {
                title?: string | undefined;
                caption?: string | undefined;
                body?: string | undefined;
                button?: string | undefined;
            } | undefined;
            fontFamily?: string[] | undefined;
        } | undefined;
        VendorPlaceholder?: boolean | undefined;
    };
    verbose: boolean;
}, {
    url: string;
    instruction: {
        commands: ("look_left" | "look_right" | "open_mouth" | "see_straight")[];
        seeds: ("look_left" | "look_right" | "open_mouth" | "see_straight")[];
        seedLimit: number;
        translator: Partial<Record<"look_left" | "look_right" | "open_mouth" | "see_straight", string>>;
        illustrator: Partial<Record<"look_left" | "look_right" | "open_mouth" | "see_straight", string>>;
        isShowInstruction: boolean;
        isSoundLooping: boolean;
        isUseSound: boolean;
        speaker: Partial<Record<"look_left" | "look_right" | "open_mouth" | "see_straight", string>>;
    };
    camera: {
        virtualLabel?: string[] | null | undefined;
    };
    credential: {
        clientId: string;
        secret: string;
    };
    disruptDuration: number;
    metadata: {
        CompressionAlgorithm: {
            dimension: [number, number];
            fileSizeThreshold: number;
            qualityThreshold?: number | undefined;
        };
        MagicNumber: number;
        ScreenOrientation: "auto" | "landscape" | "portrait";
        WaitingTime: number;
    };
    proxy: {
        License: {
            url: string;
            params?: Record<string, any> | undefined;
            headers?: Record<string, any> | undefined;
            metaparameter?: Record<string, any> | undefined;
        };
        PassiveLiveness: {
            url: string;
            params?: Record<string, any> | undefined;
            headers?: Record<string, any> | undefined;
            metaparameter?: Record<string, any> | undefined;
        };
        GenerateKey?: {
            url: string;
            params?: Record<string, any> | undefined;
            headers?: Record<string, any> | undefined;
            metaparameter?: Record<string, any> | undefined;
        } | undefined;
        Deepfake?: {
            url: string;
            params?: Record<string, any> | undefined;
            headers?: Record<string, any> | undefined;
            metaparameter?: Record<string, any> | undefined;
        } | undefined;
    };
    timeout: number;
    content: {
        Instruction?: {
            title?: string | undefined;
            subtitle?: string | undefined;
            instructions?: {
                caption?: string | undefined;
                image?: string | undefined;
            }[] | undefined;
            action?: {
                backIcon?: string | undefined;
                start?: string | undefined;
                next?: string | undefined;
            } | undefined;
        } | undefined;
        Verification?: {
            title?: string | undefined;
            action?: {
                backIcon?: string | undefined;
            } | undefined;
            instruction?: {
                loading?: {
                    caption?: string | undefined;
                    image?: string | undefined;
                    sound?: string | undefined;
                } | undefined;
                processing?: {
                    caption?: string | undefined;
                    image?: string | undefined;
                    sound?: string | undefined;
                } | undefined;
            } | undefined;
        } | undefined;
        Result?: {
            icon?: string | undefined;
            description?: string | undefined;
        } | undefined;
    };
    theme: {
        Component?: {
            Instruction?: {
                title?: {
                    color?: string | undefined;
                    fontSize?: string | undefined;
                } | undefined;
                subtitle?: {
                    color?: string | undefined;
                    fontSize?: string | undefined;
                } | undefined;
                action?: {
                    start?: {
                        backgroundColor?: string | undefined;
                        color?: string | undefined;
                        fontSize?: string | undefined;
                        hover?: {
                            backgroundColor?: string | undefined;
                        } | undefined;
                    } | undefined;
                    next?: {
                        backgroundColor?: string | undefined;
                        color?: string | undefined;
                        fontSize?: string | undefined;
                        hover?: {
                            backgroundColor?: string | undefined;
                        } | undefined;
                    } | undefined;
                } | undefined;
                frameContainer?: {
                    backgroundColor?: string | undefined;
                } | undefined;
                figcaption?: {
                    color?: string | undefined;
                    fontSize?: string | undefined;
                } | undefined;
            } | undefined;
            Verification?: {
                title?: {
                    color?: string | undefined;
                    fontSize?: string | undefined;
                } | undefined;
                instruction?: {
                    backgroundColor?: string | undefined;
                    color?: string | undefined;
                    fontSize?: string | undefined;
                } | undefined;
                frameContainer?: {
                    backgroundColor?: string | undefined;
                } | undefined;
                camera?: {
                    initial?: {
                        borderColor?: string | undefined;
                    } | undefined;
                    undetected?: {
                        borderColor?: string | undefined;
                    } | undefined;
                    detected?: {
                        borderColor?: string | undefined;
                    } | undefined;
                } | undefined;
            } | undefined;
            Result?: {
                description?: {
                    color?: string | undefined;
                    fontSize?: string | undefined;
                } | undefined;
                frameContainer?: {
                    backgroundColor?: string | undefined;
                } | undefined;
            } | undefined;
            Shared?: {
                background?: {
                    backgroundColor?: string | undefined;
                    backgroundImage?: string | undefined;
                    backgroundSize?: string | undefined;
                } | undefined;
            } | undefined;
        } | undefined;
        Palette?: {
            primary?: {
                contrastText?: string | undefined;
                default?: string | undefined;
                LIGHT?: string | undefined;
                DARK?: string | undefined;
            } | undefined;
            secondary?: {
                contrastText?: string | undefined;
                default?: string | undefined;
                LIGHT?: string | undefined;
                DARK?: string | undefined;
            } | undefined;
        } | undefined;
        Typography?: {
            fontSize?: {
                title?: string | undefined;
                caption?: string | undefined;
                body?: string | undefined;
                button?: string | undefined;
            } | undefined;
            fontFamily?: string[] | undefined;
        } | undefined;
        VendorPlaceholder?: boolean | undefined;
    };
    verbose: boolean;
}>;

type SchemaTypeOf<T extends ZodType> = TypeOf<T>;

/**
 * Liveness SDK interface
 */
declare class Builder {
    private readonly config;
    constructor();
    /**
     * Sets the text content of the SDK to the desired text. Usually used for translation.
     * @param content the text content to replace
     * @returns this builder
     */
    setContent(content: SchemaTypeOf<typeof PartialLivenessContentConfigurationSchema>): Builder;
    /**
     * Sets the compression algorithm parameter.
     * @param algorithm the compression parameter
     * @returns this builder
     */
    setCompressionAlgorithm(algorithm: SchemaTypeOf<typeof CompressionAlgorithmSchema>): Builder;
    /**
     * Sets the preferred orientation to be forced when capturing photo.
     * @param orientation the preferred orientation
     * @returns this builder
     */
    setScreenOrientation(orientation: SchemaTypeOf<typeof ScreenOrientationSchema>): Builder;
    /**
     * Sets the credential to generate image signature for authenticity checking
     * @param credential credential used to generate image signature
     * @returns this builder
     */
    setCredential(credential: SchemaTypeOf<typeof CredentialSchema>): Builder;
    /**
     * Duration from the start of show camera preview till disrupt detection enabled.
     * @param duration the timeout duration from the start of show camera preview
     * @returns this builder
     */
    setDisruptDuration(duration: number): Builder;
    /**
     * Sets the instruction configuration
     * @param instructions an array of instructions made available to appear in instruction randomization
     * @param options more instruction parameters
     * @returns this builder
     */
    setInstruction(instructions: Array<SchemaTypeOf<typeof InstructionSchema>>, options?: Partial<Omit<SchemaTypeOf<typeof InstructionOptionsSchema>, 'seeds'>>): Builder;
    /**
     * Sets the endpoint url proxy collection to be used for the SDK
     * @param proxy endpoint proxy collection to be used
     * @returns this builder
     */
    setProxyMiddleware(proxy: SchemaTypeOf<typeof ProxyMiddlewareSchema>): Builder;
    /**
     * Sets the timeout duration from the start of verification page appearance. After this timeout expires, the SDK will throw `Verification.Timeout` message.
     * @param duration the timeout duration from the start of verification page appearance
     * @returns this builder
     */
    setTimeout(duration: number): Builder;
    /**
     * Sets the theme configuration for the SDK
     * @param theme theme configurations
     * @returns this builder
     */
    setTheme(theme: SchemaTypeOf<typeof PartialLivenessThemeConfigurationSchema>): Builder;
    /**
     * Sets the SDK base path for starting the SDK
     * @param url the SDK base path
     * @returns this builder
     */
    setURL(url: SchemaTypeOf<typeof UrlSchema>): Builder;
    /**
     * Sets array of strings to be checked if any of the camera labels has the substring of any of the specified labels
     *
     * It's recommended to not set this as empty to avoid security issues
     * @param labels array of strings to be checked
     * @default ['OBS', 'Virtual']
     * @returns this builder
     */
    setVirtualCameraLabel(labels?: string[]): Builder;
    /**
     * Builds the SDK interface that can be started and destroyed
     * @returns the SDK interface
     */
    build(): {
        config: SchemaTypeOf<typeof BuilderConfigSchema>;
        elements: {
            container: HTMLDivElement;
            iframe: HTMLIFrameElement;
        };
        onStart: (hideFrame?: boolean) => void;
        onDestroy: () => void;
    };
    /**
     * Inspects the passed configuration for debugging
     */
    inspect(): void;
}

export { Builder as default };
