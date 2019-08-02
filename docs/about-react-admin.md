Doesn't support sort by multiple fields using an array notation. Can be implemented using comma separated fields and orders. Check pagination class.

Doesn't support dynamic value for sort on the List. It always takes the first value set. Afterwards sort can be done using fields.

When you use defaultFilterValues, manually changing the filter to remove all filters will result in application of default filter values - this is not intuitive. Hence if one has alwaysOn filters use of default filter values is not useful.

Passing functions to a component is disallowed.