"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy } from "lucide-react"

interface MemberCardProps {
  memberId: string
  points: number
}

export default function MemberCard({ memberId, points }: MemberCardProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(memberId)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Cập nhật MemberCard để tối ưu cho cả desktop và mobile
  return (
    <Card className="overflow-hidden border-0 shadow-lg h-full">
      <CardContent className="p-0 h-full flex flex-col">
        <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-4 text-white">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold">Thẻ thành viên</h2>
            <div className="text-right">
              <p className="text-sm opacity-80">Điểm tích lũy</p>
              <p className="text-2xl font-bold">{points}</p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="code" className="w-full flex-1 flex flex-col">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="code">Mã thành viên</TabsTrigger>
            <TabsTrigger value="barcode">Mã vạch</TabsTrigger>
          </TabsList>
          <TabsContent value="code" className="p-4 flex-1 flex flex-col justify-center">
            <div className="flex items-center justify-between p-3 bg-gray-100 rounded-lg">
              <span className="text-xl font-mono font-bold tracking-wider">{memberId}</span>
              <button onClick={copyToClipboard} className="p-2 text-gray-500 hover:text-pink-600">
                <Copy className="w-5 h-5" />
                <span className="sr-only">Copy code</span>
              </button>
            </div>
            {copied && <p className="mt-2 text-sm text-center text-green-600">Đã sao chép mã!</p>}
          </TabsContent>
          <TabsContent value="barcode" className="p-4 flex-1 flex flex-col justify-center">
            <div className="flex flex-col items-center">
              <div className="w-full h-24 bg-white border flex items-center justify-center">
                {/* This would be replaced with an actual barcode component */}
                <svg className="w-full h-16" viewBox="0 0 200 80">
                  {/* Simple barcode representation */}
                  {Array.from({ length: 30 }).map((_, i) => (
                    <rect key={i} x={i * 6} y={10} width={Math.random() > 0.3 ? 3 : 1} height={60} fill="black" />
                  ))}
                </svg>
              </div>
              <p className="mt-2 text-sm text-center text-gray-500">Quét mã để tích điểm và sử dụng ưu đãi</p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
