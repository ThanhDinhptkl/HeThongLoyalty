"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy } from "lucide-react"
import QRCode from "react-qr-code"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/components/ui/use-toast"

interface MemberCardProps {
  memberId: string
  points: number
}

export default function MemberCard({ memberId, points }: MemberCardProps) {
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const copyToClipboard = () => {
    navigator.clipboard.writeText(memberId)
    setCopied(true)
    toast({
      title: "Đã sao chép mã thành viên",
      description: `Mã ${memberId} đã được lưu vào clipboard.`,
    })
    setTimeout(() => setCopied(false), 2000)
  }

  const nextRankTarget = 1000
  const progress = Math.min((points / nextRankTarget) * 100, 100)

  return (
    <Card className="overflow-hidden border-0 shadow-lg h-full">
      <CardContent className="p-0 h-full flex flex-col">
        {/* Header thẻ */}
        <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-4 text-white">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold">Thẻ thành viên</h2>
            <div className="text-right">
              <p className="text-sm opacity-80">Điểm tích lũy</p>
              <p className="text-2xl font-bold">{points}</p>
            </div>
          </div>

          <div className="mt-3">
            <Progress value={progress} className="h-2 bg-pink-300" />
            <p className="mt-1 text-xs text-pink-100 text-right">
              {points}/{nextRankTarget} điểm để lên hạng tiếp theo
            </p>
          </div>
        </div>

        <Tabs defaultValue="code" className="w-full flex-1 flex flex-col">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="code">Mã thành viên</TabsTrigger>
            <TabsTrigger value="barcode">QR Code</TabsTrigger>
          </TabsList>

          <TabsContent value="code" className="p-4 flex-1 flex flex-col justify-center">
            <div className="flex items-center justify-between p-3 bg-gray-100 rounded-lg">
              <span className="text-xl font-mono font-bold tracking-wider break-all">
                {memberId}
              </span>
              <button
                onClick={copyToClipboard}
                className="p-2 text-gray-500 hover:text-pink-600"
              >
                <Copy className="w-5 h-5" />
                <span className="sr-only">Copy code</span>
              </button>
            </div>
          </TabsContent>

          <TabsContent value="barcode" className="p-4 flex-1 flex flex-col justify-center items-center">
            <div className="bg-white p-4 rounded-xl shadow-md">
              <QRCode value={memberId} size={128} />
            </div>
            <p className="mt-2 text-sm text-center text-gray-500">
              Quét mã để tích điểm và sử dụng ưu đãi
            </p>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
