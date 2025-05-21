

import { animate, motion, useMotionValue, useTransform } from "motion/react"

import { useEffect } from "react"

export default function ContadorClientes() {

    const count = useMotionValue(0)

    const rounded = useTransform(() => Math.round(count.get()))

    useEffect(() => {
        const controls = animate(count, 1500, { duration: 5 })
        return () => controls.stop()
    }, [])

    return <motion.pre className="texto-contador">{rounded}</motion.pre>
}


