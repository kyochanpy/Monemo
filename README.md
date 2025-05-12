# 自分で使う用のクレカ使用金額記録アプリ
tauriが2.0がstable releaseになったのでモバイルアプリを作ってみる

https://github.com/user-attachments/assets/d21bc61c-f469-4886-b519-9a16ec25b2ec


サーバサイドはSupabase(Edge Functions)

GmailからZoho mailに転送してwebhookでedge functionsへ
edge functionsでメール文面をパースしてDBへ保存
