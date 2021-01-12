Column layouts can be achieved by using [Tailwindcss](/tailwindcss) CSS grid display and column utilities.

* `grid` sets the display property to grid.
* `grid-col-{{ number }}` determines the number of columns in the grid. The column range is determined by the `spacing` token in the configuration. Currently, the range is 1 - 8.
* `gap-{{ multiplier }}` determines the gap between columns. The number multiplies the grid base value `8px`. The multiplier range is determined by the `spacing` token in the configuration. Currently, the range is 1 - 8.

These properties are supported by responsive variants for different column settings in each major breakpoint.