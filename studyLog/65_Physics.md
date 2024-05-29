# From Cannon to Rapier

#### Time: 01:34

In the previous Physics lesson, we used Cannon.js to handle the physics part. Cannon is a great physics library, but the original code hasn’t been updated for many years. Fortunately, the PMNDRS team has been maintaining a fork of the code, called cannon-es and they’ve also implemented it in R3F (NPM, Github).

While cannon-es is a perfectly viable solution, there is a new challenger and its name is Rapier.

# Rapier

Rapier is a 3D and 2D physics engine written in Rust. It’s a relatively new library(2019), but it’s already quite feature-rich and has a lot of potential. It’s also quite fast and has a lot of features that Cannon doesn’t have.

It uses WebAssembly to run in the browser and has a very nice API. It’s also quite easy to use and has a lot of examples.

The library is also “determinism”. By default, running the simulation with the same conditions will result in the same animation, even on multiple devices (https://rapier.rs/docs/user_guides/javascript/determinism).

## Colliders

Colliders are the shapes that make up out Rigidbody. They can be spheres, boxes, capsules, etc. Rapier has a lot of different colliders to choose from and they are all quite easy to use.

### Cuboid Collider

The Cuboid Collider is a box-shaped collider.
Cuboid 와 Cube 는 다른 것이다.

#### hull collider

객체에 막을 씌운 것처럼 동작한다.
그래서 사이사이에 빈 공간이 있는 경우에도 정점들을 둘러싸는 convex hull 을 만들어서 충돌체를 만든다. 즉, 세부적인 모양을 따르지 않는다.

만약 정확한 모양을 따르는 충돌체를 만들고 싶다면, `trimesh` collider 를 이용해야 한다. (triangle mesh)

### trigger collider

그런데 주의할 점은, 이 trimesh collider 는 움직이지 않는 상태의 rigid body 에만 써야 한다는 거다. 움직이는 상태의 rigid body (dynamic rigid body) 에 쓰면 버그가 발생하거나 이상하게 동작할 수 있다.

## Custom collider

RigidBody 에 colliders={false} 로 두고, 우리가 자체적으로 collider 를 만들 수 있다. 이 때, Rapier 의 공식문서를 참고하면 어떤 collider 를 만들 수 있는지 확인가능하다.

# Physics world

## Gravity

Rapier 의 gravity 는 기본적으로 0, -9.81, 0 이다. 즉, 지구의 중력을 모방한다. 각 RigidBody 마다 gravityScale 을 조절할 수도 있다. (기본값 1)

## Restitution (반발력)

얼마나 튕길 수 있는지를 본다. 기본값은 0 이라서 전혀 튕기지 않는다. 그리고 한 쪽의 RigidBody 가 1 의 Restitution 을 가지더라도 그것과 부딪히는 RigidBody 의 Restitution 이 0 이라면 좀 튕기다 만다. 즉 둘 다 1 이어야 물리적으로 불가능한 영원히 튕기는 것이 일어나는 것이고, 그게 아니라면 그 둘의 평균값 정도의 반발력을 보여준다. 이 때 단순히 두 값의 평균을 내는 것이 아니라, 다른 방식으로 계산되길 바란다면 커스텀하게 구현할 수도 있다.

## Friction

기본값은 0.7이다. 0이라면 조금만 힘줘도 계속해서 미끄러지겠지?
Restitution 과 마찬가지로 두 RigidBody 의 Friction 값이 다르다면, 그 둘의 평균값 정도의 마찰력을 보여준다.

## Mass

자동으로 계산된다. RigidBody 를 이루고 있는 Colliders 의 masses 의 총합으로. 그리고 Collider 의 mass 는 모양과 크기에 따라 또 따로 계산된다.

# KinematicPosition

# Matrix4

position, rotation, scale 을 가지고 있는 객체. 이것을 이용해서 객체의 transformation 에 따라 vertices 를 변환시킬 수 있다.
