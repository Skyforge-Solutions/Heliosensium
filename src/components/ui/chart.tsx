import * as React from "react"
import { Line, LineChart, ResponsiveContainer, Tooltip } from "recharts"

type Item = {
  color: string
}

interface DataPoint {
  [key: string]: string | number
}

interface TooltipPayloadItem {
  dataKey: string
  value: number | string
}

interface ChartProps {
  data: DataPoint[]
  items: Record<string, Item>
}

export function Chart({ data, items }: ChartProps) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="grid grid-cols-2 gap-2">
                    {payload.map((item: TooltipPayloadItem) => (
                      <div key={item.dataKey} className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-muted-foreground">
                          {item.dataKey}
                        </span>
                        <span className="font-bold text-muted-foreground">
                          {item.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )
            }
            return null
          }}
        />
        {Object.entries(items).map(([key, item]) => (
          <Line
            key={key}
            type="monotone"
            dataKey={key}
            stroke={item.color}
            strokeWidth={2}
            dot={false}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  )
}
