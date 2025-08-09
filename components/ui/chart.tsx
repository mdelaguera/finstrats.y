"use client"

import * as React from "react"
import { Label, Pie, PieChart, LabelList, type LabelListProps } from "recharts"

import { cn } from "@/lib/utils"
import { ChartConfig } from "@/components/ui/chart"

const ChartContext = React.createContext<ChartConfig | null>(null)

function useChart() {
  const context = React.useContext(ChartContext)
  if (!context) {
    throw new Error("useChart must be used within a ChartProvider.")
  }
  return context
}

const ChartProvider = ({
  config,
  children,
}: {
  config: ChartConfig
  children: React.ReactNode
}) => {
  return <ChartContext.Provider value={config}>{children}</ChartContext.Provider>
}

function ChartContainer({
  className,
  children,
  config,
  ...props
}: React.ComponentProps<"div"> & {
  config: ChartConfig
}) {
  const id = React.useId()
  return (
    <ChartContext.Provider value={config}>
      <div
        data-chart={id}
        className={cn(
          "flex h-[300px] w-full items-center justify-center text-xs [&_.recharts-cartesian-axis-tick_line]:stroke-border [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-dot]:fill-primary [&_.recharts-tooltip-cursor]:fill-accent [&_.recharts-xAxis_label]:fill-foreground [&_.recharts-yAxis_label]:fill-foreground",
          className
        )}
      >
        {children}
      </div>
    </ChartContext.Provider>
  )
}

const ChartTooltip = ({
  className,
  ...props
}: React.ComponentProps<typeof PieChart>) => {
  return (
    <PieChart
      cursor={{ strokeDasharray: "8 8" }}
      wrapperClassName={cn("!bg-card !text-card-foreground", className)}
      {...props}
    />
  )
}

const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof PieChart> & {
    hideLabel?: boolean
    hideIndicator?: boolean
    indicator?: "dot" | "dashed"
    nameKey?: string
    labelKey?: string
  }
>(
  (
    {
      className,
      hideLabel = false,
      hideIndicator = false,
      indicator = "dot",
      nameKey,
      labelKey,
      ...props
    },
    ref
  ) => {
    const { config } = React.useContext(ChartContext)

    return (
      <PieChart
        ref={ref}
        className={cn(
          "grid min-w-[120px] items-center text-xs",
          hideIndicator && "gap-1",
          className
        )}
        {...props}
      >
        {(!hideLabel || labelKey) && (
          <div className="border-b px-3 pb-1 text-muted-foreground">
            {props.payload?.[0] && labelKey
              ? props.payload?.[0].payload[labelKey]
              : props.label}
          </div>
        )}
        <div className="p-3 pt-1">
          {props.payload?.map((item: any) => {
            const key = nameKey || item.dataKey
            const content = config[key]

            return (
              <div
                key={item.dataKey}
                className={cn(
                  "flex items-center gap-2",
                  item.color && `text-[--color-${key}]`
                )}
              >
                {!hideIndicator && (
                  <div
                    className={cn("h-2 w-2 shrink-0 rounded-full", {
                      "bg-[--color-bg]": indicator === "dot",
                      "w-0 border-[1.5px] border-dashed border-[--color-bg]":
                        indicator === "dashed",
                    })}
                  />
                )}
                {content?.label || item.name}:{" "}
                {item.value?.toLocaleString() || item.value}
              </div>
            )
          })}
        </div>
      </PieChart>
    )
  }
)

const ChartLegend = ({
  className,
  ...props
}: React.ComponentProps<typeof PieChart>) => {
  const { config } = React.useContext(ChartContext)

  return (
    <PieChart
      content={({ payload }) => {
        return (
          <div
            className={cn(
              "flex flex-wrap items-center justify-center gap-4",
              className
            )}
          >
            {payload?.map((item: any) => {
              const key = item.dataKey
              const content = config[key]

              if (!content) return null

              return (
                <div
                  key={key}
                  className={cn(
                    "flex items-center gap-1",
                    item.inactive && "opacity-50"
                  )}
                >
                  <div
                    className={cn("h-2 w-2 shrink-0 rounded-full", {
                      "bg-[--color-bg]": content.color,
                    })}
                    style={
                      {
                        "--color-bg": `hsl(${content.color})`,
                      } as React.CSSProperties
                    }
                  />
                  <span>{content.label}</span>
                </div>
              )
            })}
          </div>
        )
      }}
      {...props}
    />
  )
}

const ChartLabel = ({
  className,
  ...props
}: React.ComponentProps<typeof LabelList>) => {
  const { config } = React.useContext(ChartContext)

  return (
    <LabelList
      className={cn("fill-foreground", className)}
      content={({ value, ...props }) => {
        const content = config[props.dataKey as string]
        return (
          <text
            fill={content?.color || "hsl(var(--foreground))"}
            fontSize={12}
            {...props}
          >
            {value}
          </text>
        )
      }}
      {...props}
    />
  )
}

export { ChartProvider, useChart, ChartContainer, ChartTooltip, ChartTooltipContent, Label, Pie, PieChart }
