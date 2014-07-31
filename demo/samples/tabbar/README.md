A tabbar component similar to [Bootstrap javascript togglable tabs](http://getbootstrap.com/javascript/#tabs)

#### Attributes ####

| Name | Binding | Type | Default | Description |
| ---- | ------- | ---- | ------- | ----------- |
| **index** | 2-way | int | 0 | Index (0-based) of the active tab. |
| **noTransition** | none | boolean | false | Whether transitions are activated. |
| **display** | none | string | tabs | Define how the tabs must be display. The availables values are tabs, pills and vertical |
| **justified** | none | boolean | false | if true, the tabs width are equaly distribuated through the whole width |

#### Elements ####
| Name | Description |  |
| ---- | ----------- | - |
| **@tab** | A tab of the carousel. | |
| **@tab / @content** | The content of the tab, any HTML element. | **Default** |
| **@tab / @label** | The label of the tab, a block of HTML displayed at the bottom center. | |
| **@tab / @disable** | boolean. false by default. If true, the tab is disabled and not clickable | |

#### Events ####

| Name | Description |
| ---- | ----------- |
| **onshow** | This event fires when a tab has been clicked, before the new tab has been shown. |
| **onshown** | This event fires when a tab has been clicked, after the new tab has been shown. |

