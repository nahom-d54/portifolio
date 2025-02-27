"use client"

import * as React from "react"
import { Area, Bar, Legend, Line, Radar, ResponsiveContainer, Tooltip } from "recharts"

import { cn } from "@/lib/utils"

interface ChartProps extends React.HTMLAttributes<HTMLDivElement> {}

const ChartContainer = React.forwardRef<HTMLDivElement, ChartProps>(({ className, children, ...props }, ref) => (
  <div ref={ref} className={cn("w-full h-full", className)} {...props}>
    <ResponsiveContainer width="100%" height="100%">
      {children}
    </ResponsiveContainer>
  </div>
))
ChartContainer.displayName = "ChartContainer"

const ChartTooltip = React.forwardRef<React.ElementRef<typeof Tooltip>, React.ComponentPropsWithoutRef<typeof Tooltip>>(
  ({ className, ...props }, ref) => (
    <Tooltip
      ref={ref}
      contentStyle={{
        background: "hsl(var(--background))",
        border: "1px solid hsl(var(--border))",
        borderRadius: "var(--radius)",
        boxShadow: "var(--shadow)",
      }}
      {...props}
    />
  ),
)
ChartTooltip.displayName = "ChartTooltip"

const ChartLegend = React.forwardRef<React.ElementRef<typeof Legend>, React.ComponentPropsWithoutRef<typeof Legend>>(
  ({ className, ...props }, ref) => (
    <Legend
      ref={ref}
      iconSize={16}
      iconType="circle"
      layout="horizontal"
      verticalAlign="bottom"
      align="center"
      {...props}
    />
  ),
)
ChartLegend.displayName = "ChartLegend"

const ChartLine = React.forwardRef<React.ElementRef<typeof Line>, React.ComponentPropsWithoutRef<typeof Line>>(
  ({ className, ...props }, ref) => <Line ref={ref} type="monotone" strokeWidth={2} activeDot={{ r: 6 }} {...props} />,
)
ChartLine.displayName = "ChartLine"

const ChartBar = React.forwardRef<React.ElementRef<typeof Bar>, React.ComponentPropsWithoutRef<typeof Bar>>(
  ({ className, ...props }, ref) => <Bar ref={ref} {...props} />,
)
ChartBar.displayName = "ChartBar"

const ChartArea = React.forwardRef<React.ElementRef<typeof Area>, React.ComponentPropsWithoutRef<typeof Area>>(
  ({ className, ...props }, ref) => <Area ref={ref} type="monotone" strokeWidth={2} {...props} />,
)
ChartArea.displayName = "ChartArea"

const ChartRadar = React.forwardRef<React.ElementRef<typeof Radar>, React.ComponentPropsWithoutRef<typeof Radar>>(
  ({ className, ...props }, ref) => <Radar ref={ref} {...props} />,
)
ChartRadar.displayName = "ChartRadar"

export { ChartContainer, ChartTooltip, ChartLegend, ChartLine, ChartBar, ChartArea, ChartRadar }

