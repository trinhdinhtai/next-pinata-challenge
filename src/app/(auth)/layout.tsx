import { PropsWithChildren } from "react"

const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex h-full flex-col">
      <div className="z-[4] flex h-full w-full flex-col items-center justify-center">
        <div className="h-full w-full md:h-auto md:w-[420px]">{children}</div>
      </div>
    </div>
  )
}

export default AuthLayout
