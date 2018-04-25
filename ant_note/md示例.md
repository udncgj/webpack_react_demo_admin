# 装配 #
这些方法会在组件实例被创建和插入DOM中时被调用:

## constructor() ##

***
## static getDerivedStateFromProps() ##

组件实例化后和接受新属性时将会调用getDerivedStateFromProps。它应该返回一个对象来更新状态，或者返回null来表明新属性不需要更新任何状态。

注意，如果父组件导致了组件的重新渲染，即使属性没有更新，这一方法也会被调用。如果你只想处理变化，你可能想去比较新旧值。

调用this.setState() 通常不会触发 getDerivedStateFromProps()。

***
## componentWillMount() / UNSAFE_componentWillMount() ##

UNSAFE_componentWillMount()在装配发生前被立刻调用。其在render()之前被调用，因此在这方法里同步地设置状态将不会触发重渲。

避免在该方法中引入任何的副作用或订阅。对于这些使用场景，我们推荐使用constructor()来替代。

这是唯一的会在服务端渲染调起的生命周期钩子函数。

***
## render() ##

***
## componentDidMount() ##

componentDidMount()在组件被装配后立即调用。初始化使得DOM节点应该进行到这里。若你需要从远端加载数据，这是一个适合实现网络请求的地方。在该方法里设置状态将会触发重渲。

这一方法是一个发起任何订阅的好地方。如果你这么做了，别忘了在componentWillUnmount()退订。

在这个方法中调用setState()将会触发一次额外的渲染，但是它将在浏览器刷新屏幕之前发生。这保证了即使render()将会调用两次，但用户不会看到中间状态。谨慎使用这一模式，因为它常导致性能问题。然而，它对于像模态框和工具提示框这样的例子是必须的。这时，在渲染依赖DOM节点的尺寸或者位置的视图前，你需要先测量这些节点。

***

# 更新 #
属性或状态的改变会触发一次更新。当一个组件在被重渲时，这些方法将会被调用：

## componentWillReceiveProps() / UNSAFE_componentWillReceiveProps() ##

***
## static getDerivedStateFromProps() ##

***
## shouldComponentUpdate() ##

***
## componentWillUpdate() / UNSAFE_componentWillUpdate() ##

***
## render() ##

***
## getSnapshotBeforeUpdate() ##

***
## componentDidUpdate() ##

***
# 卸载 #
当一个组件被从DOM中移除时，该方法被调用：

## componentWillUnmount() ##

***
# 错误处理 #
在渲染过程中发生错误时会被调用：

## componentDidCatch() ##

***
# 其他API #
每一个组件还提供了其他的API：

## setState() ##

***
## forceUpdate() ##

***
# 类属性 #
## defaultProps ##

***
## displayName ##

***
# 实例属性 #
## props ##

***
## state ##

***








import { Row, Col } from 'antd';


````
<Row gutter={16}>
  <Col span={12}>col-12</Col>
  <Col span={12}>col-12</Col>
</Row>
````

# 这是 H1 #

## 这是 H2 ##

### 这是 H3 ######

> This is a blockquote with two paragraphs. Lorem ipsum dolor sit amet,
>> consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus.
> Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.
> ## 这是一个标题。
> Donec sit amet nisl. Aliquam semper ipsum sit amet velit. Suspendisse
> id sem consectetuer libero luctus adipiscing.

> This is a blockquote with two paragraphs. Lorem ipsum dolor sit amet,
consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus.
Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.

> Donec sit amet nisl. Aliquam semper ipsum sit amet velit. Suspendisse
id sem consectetuer libero luctus adipiscing.

*   Red
    qweqwe

    qweqwe
*   Green
*   Blue
+   Red
+   Green
+   Blue
-   Red
-   Green
-   Blue
1.  Bird
2.  McHale
3.  Parish

1.  This is a list item with two paragraphs. Lorem ipsum dolor
    sit amet, consectetuer adipiscing elit. Aliquam hendrerit
    mi posuere lectus.

    Vestibulum enim wisi, viverra nec, fringilla in, laoreet
    vitae, risus. Donec sit amet nisl. Aliquam semper ipsum
    sit amet velit.

2.  Suspendisse id sem consectetuer libero luctus adipiscing.

*   A list item with a blockquote:

    > This is a blockquote
    > inside a list item.
1986. What a great season.

1986\. What a great season.

Here is an example of AppleScript:

    tell application "Foo"
        beep
    end tell

* * *

***

*****

- - -

---------------------------------------

<http://example.com/>
<address@example.com>

This is [an baidu](http://baidu.com/ "Title") inline link.

[This link](http://example.net/) has no title attribute.

This is [an baidu][id] reference-style link.

[id]: http://baidu.com/  "Optional Title Here"

I get 10 times more traffic from [Google] [1] than from
[Yahoo] [] or [MSN][3].

  [1]: http://google.com/        "Google"
  [Yahoo]: http://search.yahoo.com/  "Yahoo Search"
  [3]: http://search.msn.com/    "MSN Search"

*single asterisks*

_single underscores_

**double asterisks**

__double underscores__

Use the `printf()` function.Please don't use any `<blink>` tags.

``There is a literal backtick (`) here.``