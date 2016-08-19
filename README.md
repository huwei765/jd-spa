**JD-SPA**
===================

也叫线偶框架，这是一个基于backbone.js、marionette.js、require.js来搭建的一套前端模块化开放框架，旨在降低开发门槛，让前端开发变得不再困难

----------
**线偶原理**

将一个业务系统按业务划分为很多子应用，每个子应用被一个中心应用控制，包括：应用的启动、停止、交互等

> **Note:**

> - *传统意义上的线偶指的是提线木偶，是一种民间艺术。表演者通过束缚在控制帮上的线去控制各个木偶的行为*.
> - *两个独立的木偶互相不会受影响，卸载掉或新增一个木偶对其它木偶没有影响*.
> - *两个木偶有交互时，交互信息是通过控制棒来传递的*.

**标准化**

让框架标准化可以让应用开发变得轻松简单

#### <i class="icon-refresh"></i> 命名标准化
    模块命名：
      采用“大写首字母xx”+App
      比如：ContactsApp
    模块文件命名
      应用名(小写) + “_app.js”，比如：contacts_app.js
    Controller文件命名
      子应用名(小写) + “_controller.js”，比如：list_controller.js
    View文件命名
      子应用名(小写) + “_view.js”，比如： list_view.js
    Trigger事件命名
      应用名(小写) +“：”＋action(小写)，比如：contacts:list 
    Command命令命名
      “set:”+ action(小写) + “:”+  应用名(小写) 比如：set:show:contacts
    Reqres请求响应命名
      “rs：”+ model(小写) +“：”+ action(小写)，比如：rs：contact：getall
#### <i class="icon-refresh"></i> 模块定义标准化
	主模块定义
		设置regions
		声明子app切换的方法
		声明其它常用的方法
		设置启动默认动作
	业务型子模块定义
		Sub_app
			每个子app都有一个接口服务，这个接口服务主要提供对外对内的通信机制
		List
			controller ： 业务逻辑控制
			View :  视图渲染控制
			Templates : 各个视图模板
		Edit
			同上
		new
			同上
		show
			同上

#### <i class="icon-refresh"></i> 路由标准化
	不同于传统路由
		路由本身是一种状态机
		传统概念路由是一种基于后端解决策略的路由
		前端路由是url中 #号之后的那部分路由，这部分路由从传统机制上说，这个路由所表示的任何页面其实还是一个页面
	为什么需要路由
		前端路由可以做到页面跳转
	前端路由标准化
		所有的路由都归到一个统一的路由文件上去，便于集中式管理
		路由规则定义必须是： sub_app应用名(小写) + “list/edit/new/show” +[id]
		路由映射到不同的子app上时，执行启动子app, 但是通信方式是：事件和命令
#### <i class="icon-refresh"></i> 解耦标准化
	解耦机制
		一根线贯穿所有，一个RootApp控制所有的subApp
		 两个subApp完全解耦，互相没有依赖关系，去除一个模块不影响其它任何模块的运行
		subApp与subApp之间的通信是通过RootApp传导的，传导的方式有：事件、命令、reqres
		模块内部的组件通信则是靠强制依赖（require或define）
	通信机制标准化
		事件
			subApp与subApp之间的通信必须定义通信事件
		命令
			subApp与subApp之间的通信也可选command方式
		 reqres
			这种方式其实是一种ajax异步请求的方式，这种方式通信是有返回值的。所以这种通信方式适合对entity数据的查询逻辑。
			
**创建新应用**
#### <i class="icon-folder-open"></i> 1. 创建文件目录结构

	mb文件目录就是我们的样本目录，如果你已经定义了一个新的应用，比如取名为：address,那么你可以全局替换，分别将test替换成address，tests替换成addresses，Test替换成Address，Tests替换成Addresses.

#### <i class="icon-pencil"></i> 2.公共文件修改

	Main文件
		Main文件是整个框架的入口，这里会对新业务进行引入配置，所以需要在define里增加新业务app的依赖定义
	Router
		统一路由文件，这里配置新业务模块的路由映射，按给定的规则进行配置即可
		配置一个路由，再声明一个API里的映射方法
		另外还需要配置一个内容是：路由默认导航
	Entities(数据实体层)
		这里主要修改下model的属性字段以及初始值
		一般还需要修改头部导航菜单的model内容


#### <i class="icon-trash"></i> 3. 引入样式文件

	重新定义一个样式文件，并在index.html中引入该样式文件；或直接把样式写入到默认样式文件中去

#### <i class="icon-hdd"></i> 4. 拷贝mb目录内容到框架目录下进行新增或替换文件

	这种情况下，正常情况下，你的新应用已经可以正常被运行了.
#### <i class="icon-trash"></i> 5. 模块个性化修改
	新的应用已经被生成，接下来就是按照你的新应用去做功能修改

