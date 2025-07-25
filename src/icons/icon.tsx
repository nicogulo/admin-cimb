/* eslint-disable react/jsx-props-no-spreading */
import React from "react"

export interface IconsProps extends React.SVGProps<SVGSVGElement> {
    /**
     * Icon name
     */
    icon: React.FC<React.SVGProps<SVGSVGElement>> | React.ReactElement<any, any>
    /**
     * Data test id
     */
    dataTestId?: string
}

const Icons: React.FC<IconsProps> = ({
    icon: Component,
    width = 16,
    height = 16,
    dataTestId = "icon",
    ...props
}: IconsProps) => {
    if (typeof Component === "object") {
        const cloneComponent = React.cloneElement(Component, {
            width,
            height,
            ...props
        })

        return (
            <div data-testid={dataTestId || "icon"} className="w-fit h-fit inline-flex items-center justify-center">
                {cloneComponent}
            </div>
        )
    }

    return (
        <div data-testid={dataTestId || "icon"} className="w-fit h-fit inline-flex items-center justify-center">
            <Component width={width} height={height} {...props} />
        </div>
    )
}

export default Icons
