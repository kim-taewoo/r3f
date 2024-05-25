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
